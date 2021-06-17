import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core'
import Map from 'ol/Map'
import View from 'ol/View'
import Feature from 'ol/Feature'
import { OSM, Vector as VectorSource } from 'ol/source'
import Stamen from 'ol/source/Stamen'
import ImageWMS from 'ol/source/ImageWMS'
import { Tile as TileLayer, Vector as VectorLayer } from 'ol/layer'
import ImageLayer from 'ol/layer/Image'
import GeoJSON from 'ol/format/GeoJSON'
import { Fill, RegularShape, Stroke, Style } from 'ol/style'
import { transform } from 'ol/proj'
import { ColorService, RecordSummary } from '@lib/common'
import { asArray, asString } from 'ol/color'
import { BehaviorSubject } from 'rxjs'
import { HttpClient } from '@angular/common/http'
import { MatPaginator } from '@angular/material/paginator'
import { MatSort } from '@angular/material/sort'
import { MatTableDataSource } from '@angular/material/table'
import { select, Store } from '@ngrx/store'
import { getHoverRecord, SearchState } from '@lib/search'

const DEFAULT_PRIMARY_COLOR = '#e1a110'

class Link {
  protocol
  url
  name
}

class TableSource {
  data: MatTableDataSource<any>
  columns: Array<string>
  size: number
}

@Component({
  selector: 'data-map',
  templateUrl: './data-map.component.html',
})
export class DataMapComponent implements OnInit, AfterViewInit {
  @ViewChild('map') mapElt: ElementRef
  @ViewChild(MatPaginator) paginator: MatPaginator
  @ViewChild(MatSort) sort: MatSort

  record$ = this.store.pipe(select(getHoverRecord))

  @Input() record: RecordSummary
  @Input() showProperties = false
  @Input() headerLabel = ''
  @Input() bboxes?: Feature
  @Input() links?: Array<Link> | string

  private linksList: Array<Link>
  // static ngAcceptInputType_links: Array<Link> | string
  //
  // get links(): Array<Link> {
  //   return this.linksList
  // }
  //
  // set links(links: any) {
  //   if (typeof value === 'string') {
  //     this.linksList = JSON.parse(links)
  //   } else {
  //     this.linksList = links
  //   }
  // }

  private map: Map
  public baseLayer: VectorLayer
  public vectorLayer: VectorLayer
  public bboxesLayer: VectorLayer
  table = new TableSource()
  tableEmitter$ = new BehaviorSubject<any>(this.table)
  basePath: string

  highlightStyle = new Style({
    image: new RegularShape({
      fill: new Fill({ color: 'orange' }),
      stroke: new Stroke({ color: 'black', width: 2 }),
      points: 1,
      radius: 1,
    }),
  })

  constructor(private http: HttpClient, private store: Store<SearchState>) {
    this.table.size = 0
    this.table.data = new MatTableDataSource()
  }

  ngOnInit(): void {}

  ngAfterViewInit() {
    this.table.data.paginator = this.paginator
    this.table.data.sort = this.sort

    this.map = new Map({
      target: this.mapElt.nativeElement,
      layers: [
        new TileLayer({
          source: new Stamen({ layer: 'toner' }),
        }),
      ],
      controls: [],
      // interactions: [],
      view: new View({
        center: transform([0, 0], 'EPSG:4326', 'EPSG:3857'),
        zoom: 1,
      }),
    })

    this.record$.pipe().subscribe((record) => {
      if (record) {
        if (record.geom) {
          this.bboxes = record.geom
          this.addBboxes()
        }
        if (record.link) {
          this.linksList = record.link.map((l) => {
            const link = new Link()
            link.url = l.url
            link.protocol = l.protocol
            link.name = l.name || '0'
            return link
          })
        }
        this.addLinks()
      }
    })

    this.addBboxes()
    this.addLinks()
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value
    this.table.data.filter = filterValue.trim().toLowerCase()

    if (this.table.data.paginator) {
      this.table.data.paginator.firstPage()
    }
  }

  getFeatureSource(url, name) {
    const wfsUrl = url.replace(/wms/i, 'wfs') // TODO: Use same logic as GN
    const key = encodeURIComponent(wfsUrl + '#' + name)
    this.http
      .post('/geonetwork/index/features?_=_search', {
        size: 1,
        query: {
          query_string: {
            query: `id:\"${key}\"`,
          },
        },
      })
      .subscribe((data: any) => {
        if (data.hits.total.value === 1) {
          const wfsDetails = data.hits.hits[0]._source
          const aggs = {}
          const cols = wfsDetails.docColumns_s.split('|')
          cols
            .filter((c) => c !== 'geom')
            .map((c) => {
              aggs[c] = { terms: { field: c, size: 20 } }
            })

          this.http
            .post('/geonetwork/index/features?_=_search', {
              from: 0,
              size: 100,
              aggs,
              query: {
                bool: {
                  must: [
                    {
                      query_string: {
                        query: `+featureTypeId:\"${key}\"`,
                      },
                    },
                  ],
                },
              },
            })
            .subscribe((data: any) => {
              const featureCount = data.hits.total.value
              if (featureCount > 0) {
                const allCols = Object.keys(data.hits.hits[0]._source)
                const tableCols = Object.keys(data.hits.hits[0]._source).filter(
                  (c) => c.startsWith('ft_')
                )

                this.table.data.data = data.hits.hits.map((d) => {
                  return d._source
                })
                this.table.size = featureCount
                this.table.columns = tableCols
                this.tableEmitter$.next(this.table)

                this.addHighlightLayer()
              }
            })
        }
      })
  }

  addHighlightLayer() {
    this.vectorLayer = new VectorLayer({
      source: new VectorSource({
        format: new GeoJSON(),
      }),
      style: this.highlightStyle,
    })
    this.map.addLayer(this.vectorLayer)
  }

  addLinks() {
    if (this.links) {
      if (typeof this.links === 'string') {
        this.linksList = JSON.parse(this.links)
      } else {
        this.linksList = this.links
      }
    }

    if (this.baseLayer) {
      this.map.removeLayer(this.baseLayer)
      this.table.data.data.length = 0
      this.table.size = 0
    }
    if (this.vectorLayer) {
      this.map.removeLayer(this.vectorLayer)
    }

    if (!this.linksList) {
      return
    }

    this.linksList.forEach((link) => {
      if (link.protocol.startsWith('OGC:WMS')) {
        this.baseLayer = new ImageLayer({
          source: new ImageWMS({
            url: link.url.substring(0, link.url.indexOf('?')),
            params: { LAYERS: link.name },
          }),
        })
        this.map.addLayer(this.baseLayer)

        let featureSource = this.getFeatureSource(link.url, link.name)
      } else if (link.protocol.match(/geojson/i)) {
        this.baseLayer = new VectorLayer({
          source: new VectorSource({
            format: new GeoJSON(),
            url: link.url,
          }),
          style: new Style({
            image: new RegularShape({
              fill: new Fill({ color: 'orange' }),
              stroke: new Stroke({ color: 'black', width: 2 }),
              points: 1,
              radius: 1,
            }),
          }),
        })

        const vectorSource = this.baseLayer.getSource()
        const that = this
        const listenerKey = vectorSource.on('change', (e) => {
          if (vectorSource.getState() === 'ready') {
            const featureCount = vectorSource.getFeatures().length
            if (featureCount > 0) {
              const tableCols = vectorSource.getFeatures()[0].getKeys()

              that.table.data.data = vectorSource.getFeatures().map((f) => {
                const o = {}
                tableCols.forEach((c) => {
                  o[c] = f.get(c)
                })
                return o
              })
              that.table.size = that.table.data.data.length
              that.table.columns = tableCols
              that.tableEmitter$.next(that.table)
            }
            // Observable.unByKey(listenerKey);
            // use vectorSource.unByKey(listenerKey) instead
            // if you do use the "master" branch of ol3
          }
        })

        this.map.addLayer(this.baseLayer)
        this.addHighlightLayer()
      } else {
        console.error('Unsupported link', link)
      }
    })
  }

  guessGeometry(feature) {
    return feature.geom || feature.geometry
  }
  zoomToFeatures(feature) {
    const guessedGeometry = this.guessGeometry(feature)
    if (this.vectorLayer && guessedGeometry) {
      this.vectorLayer.getSource().clear()
      const f = new Feature(
        guessedGeometry.getExtent
          ? guessedGeometry
          : {
              geometry: new GeoJSON({
                dataProjection: 'EPSG:4326',
                featureProjection: this.map.getView().getProjection(),
              }).readGeometry(guessedGeometry),
            }
      )
      f.setStyle(this.getDefaultStyle())
      this.vectorLayer.getSource().addFeature(f)
      console.log(f.getGeometry().getExtent())
      this.map.getView().fit(f.getGeometry().getExtent(), this.map.getSize())
    }
  }

  getProperties() {
    return Object.entries(this.bboxes.properties || {})
  }

  getPrimaryColor(opacity: number = 1) {
    const primaryColor =
      ColorService.getColor('primary') || DEFAULT_PRIMARY_COLOR
    const [r, g, b] = Array.from(asArray(primaryColor))

    return asString([r, g, b, opacity])
  }

  private getDefaultStyle(): Style {
    return new Style({
      stroke: new Stroke({
        color: this.getPrimaryColor(1),
        width: 3,
      }),
      fill: new Fill({
        color: this.getPrimaryColor(0.1),
      }),
    })
  }

  private buildVectorSource(geoJson: GeoJSON): VectorLayer {
    return new VectorSource({
      features: new GeoJSON().readFeatures(geoJson, {
        featureProjection: 'EPSG:3857',
      }),
    })
  }

  private addBboxes(): VectorLayer {
    this.map.removeLayer(this.bboxesLayer)
    if (this.bboxes) {
      this.bboxesLayer = new VectorLayer({
        source: this.buildVectorSource(this.bboxes),
        style: this.getDefaultStyle(),
      })
      this.map.addLayer(this.bboxesLayer)
      this.map
        .getView()
        .fit(this.bboxesLayer.getSource().getExtent(), this.map.getSize())
    }
  }
}
