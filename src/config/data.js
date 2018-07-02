/* 数据集 */

/* 地图标记类型与class的关系 */
export const markersType = {
  '1': 'mmk-hospital', // 医疗机构
  '2': 'mmk-village', // 村
  '3': 'mmk-bus', // 公交车
  '4': 'mmk-parking', // 停车场
  '5': 'mmk-air', // 空气监测
  '6': 'mmk-water', // 水位监测
  '7': 'mmk-library', // 图书馆
  '8': 'mmk-cultural', // 文化馆
  '9': 'mmk-polluting', // 污染企业
  '10': 'mmk-education', // 教育
  '11': 'mmk-theatre', // 剧院
  '12': 'mmk-art', // 艺术馆
  '13': 'mmk-nursing', // 养老机构
  '0': 'mmk-test' // 测试
};

export const testMapData = {
  index: [
    {
      uid: '11',
      name: '人口分布',
      type: 2, // 2地图
      itemList: [
        {
          center: [110.601394, 27.909162],
          showType: 1, // 1医院
          name: '溆浦县人民医院',
          sitemList: [
            { key: '类型', value: '县级医院', unit: '' },
            { key: '主任及副主任医师', value: '44', unit: '人' },
            { key: '主治医师', value: '14', unit: '人' },
            { key: '地址', value: '溆浦县人民路11号', unit: '' }
          ]
        },
        {
          center: [110.590412, 27.862376],
          showType: 4, // 1医院
          name: '溆浦县图书馆',
          sitemList: [
            { key: '地址', value: '溆浦县人民路11号', unit: '' }
          ]
        }
      ]
    },
    {
      uid: '22',
      name: '贫困村',
      type: 2, // 2地图
      itemList: [
        {
          center: [110.585209, 27.809624],
          showType: 1, // 1医院
          name: '溆浦县人民医院2',
          sitemList: [
            { key: '类型', value: '县级医院', unit: '' },
            { key: '主任及副主任医师', value: '44', unit: '人' },
            { key: '主治医师', value: '14', unit: '人' },
            { key: '地址', value: '溆浦县人民路11号', unit: '' }
          ]
        },
        {
          center: [110.592547, 27.721683],
          showType: 6, // 1医院
          name: '溆浦县图书馆3',
          sitemList: [
            { key: '地址', value: '溆浦县人民路11号', unit: '' }
          ]
        }
      ]
    }
  ]
};

export const testPageData = {
  index: {
    plateId: 'vis-plate-000',
    pageName: '溆浦县智慧城市指挥中心',
    plates: [
      {'plateId': 'vis-plate-001', 'serialNumber': 1, 'jumpPageId': 'poverty', 'plateName': '脱贫攻坚'},
      {'plateId': 'vis-plate-002', 'serialNumber': 2, 'jumpPageId': 'resources', 'plateName': '公共资源'},
      {'plateId': 'vis-plate-003', 'serialNumber': 3, 'jumpPageId': 'government', 'plateName': '政务信息'},
      {'plateId': 'vis-plate-004', 'serialNumber': 4, 'jumpPageId': 'society', 'plateName': '社会民生'},
      {'plateId': 'vis-plate-005', 'serialNumber': 5, 'jumpPageId': 'economics', 'plateName': '经济发展'},
      {'plateId': 'vis-plate-006', 'serialNumber': 6, 'jumpPageId': 'entironment', 'plateName': '生态环境'}
    ]
  },
  poverty: {
    plateId: 'vis-plate-010',
    pageName: '脱贫攻坚',
    plates: [
      {'plateId': 'vis-plate-011', 'serialNumber': 1, 'plateName': '贫困人口概述'},
      {'plateId': 'vis-plate-012', 'serialNumber': 2, 'plateName': '贫困类型'},
      {'plateId': 'vis-plate-013', 'serialNumber': 3, 'plateName': '民政补助'},
      {'plateId': 'vis-plate-014', 'serialNumber': 4, 'plateName': '致贫原因'},
      {'plateId': 'vis-plate-015', 'serialNumber': 5, 'plateName': '主要帮贫措施'},
      {'plateId': 'vis-plate-016', 'serialNumber': 6, 'plateName': '脱贫进度'}
    ]
  },
  resources: {
    plateId: 'vis-plate-020',
    pageName: '公共资源',
    plates: [
      {'plateId': 'vis-plate-021', 'serialNumber': 1, 'plateName': '医疗机构'},
      {'plateId': 'vis-plate-022', 'serialNumber': 2, 'plateName': '公共交通'},
      {'plateId': 'vis-plate-023', 'serialNumber': 3, 'plateName': '燃油补贴'},
      {'plateId': 'vis-plate-024', 'serialNumber': 4, 'plateName': '教育机构'},
      {'plateId': 'vis-plate-025', 'serialNumber': 5, 'plateName': '公共设施'},
      {'plateId': 'vis-plate-026', 'serialNumber': 6, 'plateName': '文化旅游服务'}
    ]
  },
  government: {
    plateId: 'vis-plate-030',
    pageName: '政务信息',
    plates: [
      {'plateId': 'vis-plate-031', 'serialNumber': 1, 'plateName': '财政供养人员'},
      {'plateId': 'vis-plate-032', 'serialNumber': 2, 'plateName': '公共预算收入支出'},
      {'plateId': 'vis-plate-033', 'serialNumber': 3, 'plateName': '信访'},
      {'plateId': 'vis-plate-034', 'serialNumber': 4, 'plateName': '党员'},
      {'plateId': 'vis-plate-035', 'serialNumber': 5, 'plateName': '政务处理情况'},
      {'plateId': 'vis-plate-036', 'serialNumber': 6, 'plateName': '社会热点问题'}
    ]
  },
  society: {
    plateId: 'vis-plate-040',
    pageName: '社会民生',
    plates: [
      {'plateId': 'vis-plate-041', 'serialNumber': 1, 'plateName': '文化教育'},
      {'plateId': 'vis-plate-042', 'serialNumber': 2, 'plateName': '助学补贴'},
      {'plateId': 'vis-plate-043', 'serialNumber': 3, 'plateName': '医疗卫生'},
      {'plateId': 'vis-plate-044', 'serialNumber': 4, 'plateName': '居民收入'},
      {'plateId': 'vis-plate-045', 'serialNumber': 5, 'plateName': '社会保障'},
      {'plateId': 'vis-plate-046', 'serialNumber': 6, 'plateName': '人们生活'}
    ]
  },
  economics: {
    plateId: 'vis-plate-050',
    pageName: '经济发展',
    plates: [
      {'plateId': 'vis-plate-051', 'serialNumber': 1, 'plateName': '产生总值趋势'},
      {'plateId': 'vis-plate-052', 'serialNumber': 2, 'plateName': '农业经济'},
      {'plateId': 'vis-plate-053', 'serialNumber': 3, 'plateName': '工业经济'},
      {'plateId': 'vis-plate-054', 'serialNumber': 4, 'plateName': '固定资产投资'},
      {'plateId': 'vis-plate-055', 'serialNumber': 5, 'plateName': '社会消费品零售'},
      {'plateId': 'vis-plate-056', 'serialNumber': 6, 'plateName': '其他指标'}
    ]
  },
  entironment: {
    plateId: 'vis-plate-060',
    pageName: '生态环境',
    plates: [
      {'plateId': 'vis-plate-061', 'serialNumber': 1, 'plateName': '生态环境1'},
      {'plateId': 'vis-plate-062', 'serialNumber': 2, 'plateName': '生态环境2'},
      {'plateId': 'vis-plate-063', 'serialNumber': 3, 'plateName': '生态环境3'},
      {'plateId': 'vis-plate-064', 'serialNumber': 4, 'plateName': '生态环境4'},
      {'plateId': 'vis-plate-065', 'serialNumber': 5, 'plateName': '生态环境5'},
      {'plateId': 'vis-plate-066', 'serialNumber': 6, 'plateName': '生态环境6'}
    ]
  }
};

/**
 * @summary 库存状态
 */
export const testStates = {
  '1': '有效',
  '0': '无效'
};

// 溆浦县乡镇数据
export const xpxVillagesArray = [
  {
    'citycode': '0745',
    'adcode': '431224',
    'name': '龙庄湾乡',
    'center': {'P': 27.4474, 'O': 110.62400000000002, 'lng': 110.624, 'lat': 27.4474},
    'level': 'street',
    'boundaries': []
  }, {
    'citycode': '0745',
    'adcode': '431224',
    'name': '小横垅乡',
    'center': {'P': 27.6643, 'O': 110.5, 'lng': 110.5, 'lat': 27.6643},
    'level': 'street',
    'boundaries': []
  },
  {
    'citycode': '0745',
    'adcode': '431224',
    'name': '油洋乡',
    'center': {'P': 27.9943, 'O': 110.74000000000001, 'lng': 110.74, 'lat': 27.9943},
    'level': 'street',
    'boundaries': []
  }, {
    'citycode': '0745',
    'adcode': '431224',
    'name': '沿溪乡',
    'center': {'P': 27.6928, 'O': 110.74000000000001, 'lng': 110.74, 'lat': 27.6928},
    'level': 'street',
    'boundaries': []
  }, {
    'citycode': '0745',
    'adcode': '431224',
    'name': '均坪镇',
    'center': {'P': 28.0801, 'O': 110.52199999999999, 'lng': 110.522, 'lat': 28.0801},
    'level': 'street',
    'boundaries': []
  }, {
    'citycode': '0745',
    'adcode': '431224',
    'name': '舒溶溪乡',
    'center': {'P': 27.9943, 'O': 110.51300000000003, 'lng': 110.513, 'lat': 27.9943},
    'level': 'street',
    'boundaries': []
  }, {
    'citycode': '0745',
    'adcode': '431224',
    'name': '葛竹坪镇',
    'center': {'P': 27.4995, 'O': 110.54899999999998, 'lng': 110.549, 'lat': 27.4995},
    'level': 'street',
    'boundaries': []
  }, {
    'citycode': '0745',
    'adcode': '431224',
    'name': '黄茅园镇',
    'center': {'P': 27.5018, 'O': 110.51300000000003, 'lng': 110.513, 'lat': 27.5018},
    'level': 'street',
    'boundaries': []
  }, {
    'citycode': '0745',
    'adcode': '431224',
    'name': '中都乡',
    'center': {'P': 27.6894, 'O': 110.74200000000002, 'lng': 110.742, 'lat': 27.6894},
    'level': 'street',
    'boundaries': []
  }, {
    'citycode': '0745',
    'adcode': '431224',
    'name': '淘金坪乡',
    'center': {'P': 27.8578, 'O': 110.67500000000001, 'lng': 110.675, 'lat': 27.8578},
    'level': 'street',
    'boundaries': []
  }, {
    'citycode': '0745',
    'adcode': '431224',
    'name': '两丫坪镇',
    'center': {'P': 27.7816, 'O': 110.66700000000003, 'lng': 110.667, 'lat': 27.7816},
    'level': 'street',
    'boundaries': []
  }, {
    'citycode': '0745',
    'adcode': '431224',
    'name': '思蒙镇',
    'center': {'P': 27.8528, 'O': 110.47199999999998, 'lng': 110.472, 'lat': 27.8528},
    'level': 'street',
    'boundaries': []
  }, {
    'citycode': '0745',
    'adcode': '431224',
    'name': '统溪河镇',
    'center': {'P': 27.7948, 'O': 110.584, 'lng': 110.584, 'lat': 27.7948},
    'level': 'street',
    'boundaries': []
  }, {
    'citycode': '0745',
    'adcode': '431224',
    'name': '低庄镇',
    'center': {'P': 28.1047, 'O': 110.83499999999998, 'lng': 110.835, 'lat': 28.1047},
    'level': 'street',
    'boundaries': []
  }, {
    'citycode': '0745',
    'adcode': '431224',
    'name': '龙潭镇',
    'center': {'P': 27.5059, 'O': 110.55200000000002, 'lng': 110.552, 'lat': 27.5059},
    'level': 'street',
    'boundaries': []
  }, {
    'citycode': '0745',
    'adcode': '431224',
    'name': '桥江镇',
    'center': {'P': 27.9267, 'O': 110.63, 'lng': 110.63, 'lat': 27.9267},
    'level': 'street',
    'boundaries': []
  }, {
    'citycode': '0745',
    'adcode': '431224',
    'name': '卢峰镇',
    'center': {'P': 27.9517, 'O': 110.637, 'lng': 110.637, 'lat': 27.9517},
    'level': 'street',
    'boundaries': []
  }, {
    'citycode': '0745',
    'adcode': '431224',
    'name': '北斗溪镇',
    'center': {'P': 27.6183, 'O': 110.572, 'lng': 110.572, 'lat': 27.6183},
    'level': 'street',
    'boundaries': []
  }, {
    'citycode': '0745',
    'adcode': '431224',
    'name': '深子湖镇',
    'center': {'P': 28.2123, 'O': 110.80700000000002, 'lng': 110.807, 'lat': 28.2123},
    'level': 'street',
    'boundaries': []
  }, {
    'citycode': '0745',
    'adcode': '431224',
    'name': '双井镇',
    'center': {'P': 28.0268, 'O': 110.64800000000002, 'lng': 110.648, 'lat': 28.0268},
    'level': 'street',
    'boundaries': []
  }, {
    'citycode': '0745',
    'adcode': '431224',
    'name': '三江镇',
    'center': {'P': 28.0028, 'O': 110.971, 'lng': 110.971, 'lat': 28.0028},
    'level': 'street',
    'boundaries': []
  }, {
    'citycode': '0745',
    'adcode': '431224',
    'name': '大江口镇',
    'center': {'P': 27.8876, 'O': 110.48900000000003, 'lng': 110.489, 'lat': 27.8876},
    'level': 'street',
    'boundaries': []
  }, {
    'citycode': '0745',
    'adcode': '431224',
    'name': '水东镇',
    'center': {'P': 27.817, 'O': 110.57100000000003, 'lng': 110.571, 'lat': 27.817},
    'level': 'street',
    'boundaries': []
  }, {
    'citycode': '0745',
    'adcode': '431224',
    'name': '祖市殿镇',
    'center': {'P': 28.0537, 'O': 110.74000000000001, 'lng': 110.74, 'lat': 28.0537},
    'level': 'street',
    'boundaries': []
  }, {
    'citycode': '0745',
    'adcode': '431224',
    'name': '观音阁镇',
    'center': {'P': 27.9598, 'O': 110.62599999999998, 'lng': 110.626, 'lat': 27.9598},
    'level': 'street',
    'boundaries': []
  }];

// 溆浦县人口分布数据
export const xpxRKFBArray = [
  {
    name: 'test1',
    center: [110.706209, 28.254008]
  },
  {
    name: 'test1',
    center: [110.706209, 28.170508]
  },
  {
    name: 'test1',
    center: [110.725435, 27.982698]
  },
  {
    name: 'test1',
    center: [110.490602, 27.998462]
  },
  {
    name: 'test1',
    center: [110.590412, 27.862376]
  },
  {
    name: 'test1',
    center: [110.573246, 27.788291]
  },
  {
    name: 'test1',
    center: [110.627244, 27.905965]
  },
  {
    name: 'test1',
    center: [110.619251, 27.845378]
  },
  {
    name: 'test1',
    center: [110.613168, 27.927807]
  }
];

// 词云
export const wordCloud =
[
  {
    'x': 'China',
    'value': 1383220000,
    'category': 'asia'
  }, {
    'x': 'India',
    'value': 1316000000,
    'category': 'asia'
  }, {
    'x': 'United States',
    'value': 324982000,
    'category': 'america'
  }, {
    'x': 'Indonesia',
    'value': 263510000,
    'category': 'asia'
  }, {
    'x': 'Brazil',
    'value': 207505000,
    'category': 'america'
  }, {
    'x': 'Pakistan',
    'value': 196459000,
    'category': 'asia'
  }, {
    'x': 'Nigeria',
    'value': 191836000,
    'category': 'africa'
  }, {
    'x': 'Bangladesh',
    'value': 162459000,
    'category': 'asia'
  }, {
    'x': 'Russia',
    'value': 146804372,
    'category': 'europe'
  }, {
    'x': 'Japan',
    'value': 126790000,
    'category': 'asia'
  }, {
    'x': 'Mexico',
    'value': 123518000,
    'category': 'america'
  }, {
    'x': 'Ethiopia',
    'value': 104345000,
    'category': 'africa'
  }, {
    'x': 'Philippines',
    'value': 104037000,
    'category': 'asia'
  }, {
    'x': 'Egypt',
    'value': 93013300,
    'category': 'africa'
  }, {
    'x': 'Vietnam',
    'value': 92700000,
    'category': 'asia'
  }, {
    'x': 'Germany',
    'value': 82800000,
    'category': 'europe'
  }, {
    'x': 'Democratic Republic of the Congo',
    'value': 82243000,
    'category': 'africa'
  }, {
    'x': 'Iran',
    'value': 80135400,
    'category': 'asia'
  }, {
    'x': 'Turkey',
    'value': 79814871,
    'category': 'asia'
  }, {
    'x': 'Thailand',
    'value': 68298000,
    'category': 'asia'
  }, {
    'x': 'France',
    'value': 67013000,
    'category': 'europe'
  }, {
    'x': 'United Kingdom',
    'value': 65110000,
    'category': 'europe'
  }, {
    'x': 'Italy',
    'value': 60599936,
    'category': 'europe'
  }, {
    'x': 'Tanzania',
    'value': 56878000,
    'category': 'africa'
  }, {
    'x': 'South Africa',
    'value': 55908000,
    'category': 'africa'
  }, {
    'x': 'Myanmar',
    'value': 54836000,
    'category': 'asia'
  }, {
    'x': 'South Korea',
    'value': 51446201,
    'category': 'asia'
  }, {
    'x': 'Colombia',
    'value': 49224700,
    'category': 'america'
  }, {
    'x': 'Kenya',
    'value': 48467000,
    'category': 'africa'
  }, {
    'x': 'Spain',
    'value': 46812000,
    'category': 'europe'
  }, {
    'x': 'Argentina',
    'value': 43850000,
    'category': 'america'
  }, {
    'x': 'Ukraine',
    'value': 42541633,
    'category': 'europe'
  }, {
    'x': 'Sudan',
    'value': 42176000,
    'category': 'africa'
  }, {
    'x': 'Uganda',
    'value': 41653000,
    'category': 'africa'
  }, {
    'x': 'Algeria',
    'value': 41064000,
    'category': 'africa'
  }, {
    'x': 'Poland',
    'value': 38424000,
    'category': 'europe'
  }, {
    'x': 'Iraq',
    'value': 37883543,
    'category': 'asia'
  }, {
    'x': 'Canada',
    'value': 36541000,
    'category': 'america'
  }, {
    'x': 'Morocco',
    'value': 34317500,
    'category': 'africa'
  }, {
    'x': 'Saudi Arabia',
    'value': 33710021,
    'category': 'asia'
  }, {
    'x': 'Uzbekistan',
    'value': 32121000,
    'category': 'asia'
  }, {
    'x': 'Malaysia',
    'value': 32063200,
    'category': 'asia'
  }, {
    'x': 'Peru',
    'value': 31826018,
    'category': 'america'
  }, {
    'x': 'Venezuela',
    'value': 31431164,
    'category': 'america'
  }, {
    'x': 'Nepal',
    'value': 28825709,
    'category': 'asia'
  }, {
    'x': 'Angola',
    'value': 28359634,
    'category': 'africa'
  }, {
    'x': 'Ghana',
    'value': 28308301,
    'category': 'africa'
  }, {
    'x': 'Yemen',
    'value': 28120000,
    'category': 'asia'
  }, {
    'x': 'Afghanistan',
    'value': 27657145,
    'category': 'asia'
  }, {
    'x': 'Mozambique',
    'value': 27128530,
    'category': 'africa'
  }, {
    'x': 'Australia',
    'value': 24460900,
    'category': 'australia'
  }, {
    'x': 'North Korea',
    'value': 24213510,
    'category': 'asia'
  }, {
    'x': 'Taiwan',
    'value': 23545680,
    'category': 'asia'
  }, {
    'x': 'Cameroon',
    'value': 23248044,
    'category': 'africa'
  }, {
    'x': 'Ivory Coast',
    'value': 22671331,
    'category': 'africa'
  }, {
    'x': 'Madagascar',
    'value': 22434363,
    'category': 'africa'
  }, {
    'x': 'Niger',
    'value': 21564000,
    'category': 'africa'
  }, {
    'x': 'Sri Lanka',
    'value': 21203000,
    'category': 'asia'
  }, {
    'x': 'Romania',
    'value': 19760000,
    'category': 'europe'
  }, {
    'x': 'Burkina Faso',
    'value': 19632147,
    'category': 'africa'
  }, {
    'x': 'Syria',
    'value': 18907000,
    'category': 'asia'
  }, {
    'x': 'Mali',
    'value': 18875000,
    'category': 'africa'
  }, {
    'x': 'Malawi',
    'value': 18299000,
    'category': 'africa'
  }
];
