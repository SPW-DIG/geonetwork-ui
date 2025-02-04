export const DEFAULT_UI_CONFIG = {
  langDetector: {
    fromHtmlTag: false,
    regexp: '^(?:/.+)?/.+/([a-z]{2,3})/.+',
    default: 'eng',
  },
  nodeDetector: {
    regexp: '^(?:/.+)?/(.+)/[a-z]{2,3}/.+',
    default: 'srv',
  },
  serviceDetector: {
    regexp: '^(?:/.+)?/.+/[a-z]{2,3}/(.+)',
    default: 'catalog.search',
  },
  baseURLDetector: {
    regexp: '^((?:/.+)?)+/.+/[a-z]{2,3}/.+',
    default: '/geonetwork',
  },
  mods: {
    global: {
      humanizeDates: true,
      dateFormat: 'YYYY-MM-DD',
    },
    footer: {
      enabled: true,
      showSocialBarInFooter: true,
    },
    header: {
      enabled: true,
      languages: {
        eng: 'en',
        dut: 'nl',
        fre: 'fr',
        ger: 'de',
        kor: 'ko',
        spa: 'es',
        cze: 'cs',
        cat: 'ca',
        fin: 'fi',
        ice: 'is',
        ita: 'it',
        por: 'pt',
        rus: 'ru',
        chi: 'zh',
        slo: 'sk',
      },
      isLogoInHeader: false,
      logoInHeaderPosition: 'left',
      fluidHeaderLayout: true,
      showGNName: true,
      isHeaderFixed: false,
    },
    cookieWarning: {
      enabled: true,
      cookieWarningMoreInfoLink: '',
      cookieWarningRejectLink: '',
    },
    home: {
      enabled: true,
      appUrl: '../../{{node}}/{{lang}}/catalog.search#/home',
      showSocialBarInFooter: true,
      fluidLayout: true,
      facetConfig: {
        inspireThemeUri: {
          terms: {
            field: 'inspireThemeUri',
            size: 34,
          },
        },
        'cl_topic.key': {
          terms: {
            field: 'cl_topic.key',
            size: 20,
          },
        },
        'cl_hierarchyLevel.key': {
          terms: {
            field: 'cl_hierarchyLevel.key',
            size: 10,
          },
        },
      },
    },
    search: {
      enabled: true,
      appUrl: '../../{{node}}/{{lang}}/catalog.search#/search',
      hitsperpageValues: [30, 60, 120],
      paginationInfo: {
        hitsPerPage: 30,
      },
      queryBase: 'any:(${any}) resourceTitleObject.default:(${any})^2',
      exactMatchToggle: true,
      scoreConfig: {
        boost: '5',
        functions: [
          {
            filter: {
              exists: {
                field: 'parentUuid',
              },
            },
            weight: 0.3,
          },
          {
            filter: {
              match: {
                'cl_status.key': 'obsolete',
              },
            },
            weight: 0.3,
          },
          {
            gauss: {
              dateStamp: {
                scale: '365d',
                offset: '90d',
                decay: 0.5,
              },
            },
          },
        ],
        score_mode: 'multiply',
      },
      autocompleteConfig: {
        query: {
          bool: {
            must: [
              {
                multi_match: {
                  query: '',
                  type: 'bool_prefix',
                  fields: [
                    'resourceTitleObject.*',
                    'resourceAbstractObject.*',
                    'tag',
                    'resourceIdentifier',
                  ],
                },
              },
            ],
          },
        },
        _source: ['resourceTitleObject'],
        from: 0,
        size: 20,
      },
      moreLikeThisConfig: {
        more_like_this: {
          fields: [
            'resourceTitleObject.default',
            'resourceAbstractObject.default',
            'tag.raw',
          ],
          like: null,
          min_term_freq: 1,
          max_query_terms: 12,
        },
      },
      facetTabField: '',
      facetConfig: {
        'cl_hierarchyLevel.key': {
          terms: {
            field: 'cl_hierarchyLevel.key',
          },
          aggs: {
            format: {
              terms: {
                field: 'format',
              },
            },
          },
        },
        'cl_spatialRepresentationType.key': {
          terms: {
            field: 'cl_spatialRepresentationType.key',
            size: 10,
          },
        },
        availableInServices: {
          filters: {
            filters: {
              availableInViewService: {
                query_string: {
                  query: '+linkProtocol:/OGC:WMS.*/',
                },
              },
              availableInDownloadService: {
                query_string: {
                  query: '+linkProtocol:/OGC:WFS.*/',
                },
              },
            },
          },
        },
        'th_gemet_tree.default': {
          terms: {
            field: 'th_gemet_tree.default',
            size: 100,
            order: {
              _key: 'asc',
            },
            include: '[^^]+^?[^^]+',
          },
        },
        'th_httpinspireeceuropaeumetadatacodelistPriorityDatasetPriorityDataset_tree.default':
          {
            terms: {
              field:
                'th_httpinspireeceuropaeumetadatacodelistPriorityDatasetPriorityDataset_tree.default',
              size: 100,
              order: {
                _key: 'asc',
              },
            },
          },
        'tag.default': {
          terms: {
            field: 'tag.default',
            include: '.*',
            size: 10,
          },
        },
        'th_regions_tree.default': {
          terms: {
            field: 'th_regions_tree.default',
            size: 100,
            order: {
              _key: 'asc',
            },
          },
        },
        resolutionScaleDenominator: {
          collapsed: true,
          histogram: {
            field: 'resolutionScaleDenominator',
            interval: 10000,
            keyed: true,
            min_doc_count: 1,
          },
        },
        creationYearForResource: {
          collapsed: true,
          histogram: {
            field: 'creationYearForResource',
            interval: 5,
            keyed: true,
            min_doc_count: 1,
          },
        },
        OrgForResource: {
          terms: {
            field: 'OrgForResource',
            size: 15,
          },
        },
        'cl_maintenanceAndUpdateFrequency.key': {
          collapsed: true,
          terms: {
            field: 'cl_maintenanceAndUpdateFrequency.key',
            size: 10,
          },
        },
        'cl_status.key': {
          terms: {
            field: 'cl_status.key',
            size: 10,
          },
        },
        dateStamp: {
          userHasRole: 'isReviewerOrMore',
          auto_date_histogram: {
            field: 'dateStamp',
            buckets: 50,
          },
        },
      },
      filters: null,
      sortbyValues: [
        {
          sortBy: 'relevance',
          sortOrder: '',
        },
        {
          sortBy: 'dateStamp',
          sortOrder: 'desc',
        },
        {
          sortBy: 'createDate',
          sortOrder: 'desc',
        },
        {
          sortBy: 'resourceTitleObject.default.keyword',
          sortOrder: '',
        },
        {
          sortBy: 'rating',
          sortOrder: 'desc',
        },
        {
          sortBy: 'popularity',
          sortOrder: 'desc',
        },
      ],
      sortBy: 'relevance',
      resultViewTpls: [
        {
          tplUrl:
            '../../catalog/components/search/resultsview/partials/viewtemplates/grid.html',
          tooltip: 'Grid',
          icon: 'fa-th',
        },
        {
          tplUrl:
            '../../catalog/components/search/resultsview/partials/viewtemplates/list.html',
          tooltip: 'List',
          icon: 'fa-bars',
        },
      ],
      resultTemplate:
        '../../catalog/components/search/resultsview/partials/viewtemplates/grid.html',
      formatter: {
        list: [
          {
            label: 'defaultView',
            url: '',
          },
          {
            label: 'full',
            url: '/formatters/xsl-view?root=div&view=advanced',
          },
        ],
        defaultUrl: '',
      },
      downloadFormatter: [
        {
          label: 'exportMEF',
          url: '/formatters/zip?withRelated=false',
          class: 'fa-file-zip-o',
        },
        {
          label: 'exportPDF',
          url: '/formatters/xsl-view?output=pdf&language=${lang}',
          class: 'fa-file-pdf-o',
        },
        {
          label: 'exportXML',
          url: '/formatters/xml',
          class: 'fa-file-code-o',
        },
      ],
      grid: {
        related: ['parent', 'children', 'services', 'datasets'],
      },
      linkTypes: {
        links: ['LINK', 'kml'],
        downloads: ['DOWNLOAD'],
        layers: ['OGC', 'ESRI:REST'],
        maps: ['ows'],
      },
      isFilterTagsDisplayedInSearch: true,
      usersearches: {
        enabled: false,
        includePortals: true,
        displayFeaturedSearchesPanel: false,
      },
      savedSelection: {
        enabled: false,
      },
    },
    map: {
      enabled: true,
      appUrl: '../../{{node}}/{{lang}}/catalog.search#/map',
      externalViewer: {
        enabled: false,
        enabledViewAction: false,
        baseUrl: 'http://www.example.com/viewer',
        urlTemplate:
          'http://www.example.com/viewer?url=${service.url}&type=${service.type}&layer=${service.title}&lang=${iso2lang}&title=${md.defaultTitle}',
        openNewWindow: false,
        valuesSeparator: ',',
      },
      is3DModeAllowed: false,
      isSaveMapInCatalogAllowed: true,
      isExportMapAsImageEnabled: false,
      storage: 'sessionStorage',
      bingKey: '',
      listOfServices: {
        wms: [],
        wmts: [],
      },
      projection: 'EPSG:3857',
      projectionList: [
        {
          code: 'urn:ogc:def:crs:EPSG:6.6:4326',
          label: 'WGS84 (EPSG:4326)',
        },
        {
          code: 'EPSG:3857',
          label: 'Google mercator (EPSG:3857)',
        },
      ],
      switcherProjectionList: [
        {
          code: 'EPSG:3857',
          label: 'Google mercator (EPSG:3857)',
        },
      ],
      disabledTools: {
        processes: false,
        addLayers: false,
        projectionSwitcher: false,
        layers: false,
        legend: false,
        filter: false,
        contexts: false,
        print: false,
        mInteraction: false,
        graticule: false,
        mousePosition: true,
        syncAllLayers: false,
        drawVector: false,
      },
      graticuleOgcService: {},
      'map-viewer': {
        context: '../../map/config-viewer.xml',
        extent: [0, 0, 0, 0],
        layers: [],
      },
      'map-search': {
        context: '../../map/config-viewer.xml',
        extent: [0, 0, 0, 0],
        layers: [],
      },
      'map-editor': {
        context: '',
        extent: [0, 0, 0, 0],
        layers: [
          {
            type: 'osm',
          },
        ],
      },
      autoFitOnLayer: false,
    },
    geocoder: {
      enabled: true,
      appUrl: 'https://secure.geonames.org/searchJSON',
    },
    recordview: {
      enabled: true,
      isSocialbarEnabled: true,
    },
    editor: {
      enabled: true,
      appUrl: '../../{{node}}/{{lang}}/catalog.edit',
      isUserRecordsOnly: false,
      minUserProfileToCreateTemplate: '',
      isFilterTagsDisplayed: false,
      fluidEditorLayout: true,
      createPageTpl:
        '../../catalog/templates/editor/new-metadata-horizontal.html',
      editorIndentType: '',
      allowRemoteRecordLink: true,
      facetConfig: {
        resourceType: {
          terms: {
            field: 'resourceType',
            size: 20,
          },
        },
        'cl_status.key': {
          terms: {
            field: 'cl_status.key',
            size: 15,
          },
        },
        sourceCatalogue: {
          terms: {
            field: 'sourceCatalogue',
            size: 15,
          },
        },
        isValid: {
          terms: {
            field: 'isValid',
            size: 10,
          },
        },
        isValidInspire: {
          terms: {
            field: 'isValidInspire',
            size: 10,
          },
        },
        groupOwner: {
          terms: {
            field: 'groupOwner',
            size: 10,
          },
        },
        recordOwner: {
          terms: {
            field: 'recordOwner',
            size: 10,
          },
        },
        groupPublished: {
          terms: {
            field: 'groupPublished',
            size: 10,
          },
        },
        documentStandard: {
          terms: {
            field: 'documentStandard',
            size: 10,
          },
        },
        isHarvested: {
          terms: {
            field: 'isHarvested',
            size: 2,
          },
        },
        isTemplate: {
          terms: {
            field: 'isTemplate',
            size: 5,
          },
        },
        isPublishedToAll: {
          terms: {
            field: 'isPublishedToAll',
            size: 2,
          },
        },
      },
    },
    admin: {
      enabled: true,
      appUrl: '../../{{node}}/{{lang}}/admin.console',
    },
    signin: {
      enabled: true,
      appUrl: '../../{{node}}/{{lang}}/catalog.signin',
    },
    signout: {
      appUrl: '../../signout',
    },
    page: {
      enabled: true,
      appUrl: '../../{{node}}/{{lang}}/catalog.search#/page',
    },
  },
}
