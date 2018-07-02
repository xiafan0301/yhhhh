let mapDataList = [
  {
    'itemName': 'string', // 人口分布
    'itemValue': 'string',
    'latitude': 0,
    'longitude': 0,
    // 绘制类型： 1 描点  2 热力图...
    'drawType': 1,
    // 右上角列表信息
    'infoList': [
      { key: '全县总人口数', value: 41.23, unit: '万', split: '：' },
      { key: '贫困人口', value: 11.23, unit: '万', split: '：' }
    ],
    'mapDataItemList': [
      {
        'itemId': 'string',
        // 实际的点需要经纬度
        'latitude': 0,
        'longitude': 0,
        // 权重（0 - 1），用于热力图等
        'weight': 0.5,
        // 类型（for icon） 1医疗 2教育 3公交车...
        'objType': 1,
        // hover/click提示信息
        'tipList': [
          { key: '类型', value: '乡镇卫生院', unit: '', split: '：' },
          { key: '地址', value: '长沙市天心区XX路01号', unit: '', split: '：' }
        ],
        'serialNumber': 0,
        'valueContent': 0,
        'valueName': 'string',
        'valueUnit': 'string'
      }
    ]
  }
];

let a = {
  'code': 'string',
  'data': {
    'configCode': 'string',
    'configItemList': [
      {
        'chartDataFlag': false,
        'configItemValueList': [
          {
            'configItemExtendList': [
              {
                'contentName': 'string',
                'serialNumber': 0,
                'valueContent': 0,
                'valueUnit': 'string'
              }
            ],
            'contentName': 'string',
            'graphicFieldFlag': false,
            'serialNumber': 0,
            'supernatantFieldFlag': false,
            'valueContent': 0,
            'valueUnit': 'string'
          }
        ],
        'itemName': 'string',
        'serialNumber': 0
      }
    ],
    'displayType': 0,
    'jumpPageId': {},
    'mapDataList': [
      {
        'itemName': 'string',
        'itemValue': 'string',
        'latitude': 0,
        'longitude': 0,
        'mapDataItemList': [
          {
            'itemId': 'string',
            'serialNumber': 0,
            'valueContent': 0,
            'valueName': 'string',
            'valueUnit': 'string'
          }
        ]
      }
    ],
    'pageId': 'string',
    'plateId': 'string',
    'plateName': 'string',
    'plateType': 0,
    'remark': 'string',
    'serialNumber': 0
  },
  'debugMsg': 'string',
  'timestamp': 'string',
  'viewMsg': 'string'
}
let b = {
  'code': 'string',
  'data': {
    'configCode': 'string',
    'configItemList': [
      {
        'chartDataFlag': false,
        'configItemValueList': [
          {
            'configItemExtendList': [
              {
                'contentName': 'string',
                'serialNumber': 0,
                'valueContent': 0,
                'valueUnit': 'string'
              }
            ],
            'contentName': 'string',
            'graphicFieldFlag': false,
            'serialNumber': 0,
            'supernatantFieldFlag': false,
            'valueContent': 0,
            'valueUnit': 'string'
          }
        ],
        'itemName': 'string',
        'serialNumber': 0
      }
    ],
    'displayType': 0,
    'jumpPageId': {},
    'mapDataList': [
      {
        'itemName': 'string',
        'itemValue': 'string',
        'latitude': 0,
        'longitude': 0,
        'mapDataItemList': [
          {
            'itemId': 'string',
            'serialNumber': 0,
            'valueContent': 0,
            'valueName': 'string',
            'valueUnit': 'string'
          }
        ]
      }
    ],
    'pageId': 'string',
    'plateId': 'string',
    'plateName': 'string',
    'plateType': 0,
    'remark': 'string',
    'serialNumber': 0
  },
  'debugMsg': 'string',
  'timestamp': 'string',
  'viewMsg': 'string'
}

let c = {
  'code': '00000000',
  'viewMsg': '成功',
  'debugMsg': '',
  'timestamp': '2018-06-12 17:31:34',
  'data': {
    'pageId': '0bfb78e3-6685-4f5b-80bd-ebd5951f0981',
    'pageName': '溆浦县智慧城市指挥中心',
    'plates': [
      {
        'plateId': 'c-6685-4f5b-80bd-ebd5951f0981',
        'plateName': '脱贫攻坚',
        'serialNumber': 11,
        'jumpPageId': '0bfb78e3-6685-4f5b-80bd-ebd5951f0981',
        'plateType': '1',
        'mapType': null,
        'configItems': [
          {
            'itemName': '贫困户籍',
            'serialNumber': 1,
            'configItemValues': [
              {
                'serialNumber': 1,
                'valueContent': '7.34',
                'valueUnit': '万户'
              }
            ]
          },
          {
            'itemName': '贫困人员',
            'serialNumber': 2,
            'configItemValues': [
              {
                'serialNumber': 1,
                'valueContent': '8.29',
                'valueUnit': '万人'
              }
            ]
          }
        ]
      },
      {
        'plateId': '0bfb78e3-6685-4f5b-80bd-ebd5951f0981',
        'plateName': '政务信息',
        'serialNumber': 13,
        'jumpPageId': '0bfb78e3-6685-4f5b-80bd-ebd5951f0981',
        'plateType': '1',
        'mapType': null,
        'configItems': [
          {
            'itemName': '县长信箱',
            'serialNumber': 1,
            'configItemValues': [
              {
                'serialNumber': 1,
                'valueContent': '245',
                'valueUnit': '件'
              },
              {
                'serialNumber': 2,
                'valueContent': '100',
                'valueUnit': '%'
              }
            ]
          },
          {
            'itemName': '信访',
            'serialNumber': 2,
            'configItemValues': [
              {
                'serialNumber': 1,
                'valueContent': '245',
                'valueUnit': '件'
              },
              {
                'serialNumber': 2,
                'valueContent': '100',
                'valueUnit': '%'
              }
            ]
          }
        ]
      }
    ]
  }
}
