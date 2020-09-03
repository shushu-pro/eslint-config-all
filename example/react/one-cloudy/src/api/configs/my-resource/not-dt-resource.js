export default {
  queryRegion: {
    // url: 'mockapi/oc/cloud/resmng/instanceSave_1597022464649',
    url: 'oc/cloud/product/queryProductSpec/:productType/:cloudRegionId',
    method: 'get',
    resa: {
      $strict: false,
      productSpecs: {
        specTypeGroup: {
          defend_capability: 'defend_capability',
          defend_ability: 'defend_capability',
        },
      },
      $reduce: [
        'cloud_sec_monitor_spec', {
          children: {
            $key: 'productSpecs',
            id: true,
            label: true,
            name: true,
          },
        },
      ],
    },
    // mockData({data,hea}){
    //   return {
    //     ...
    //   }
    // }
  },
  nDtInstanceDetail: {
    url: 'oc/cloud/resmng/nDtInstanceDetail/:productInstanceId',
    method: 'get',
    resa: {
      $strict: false,
      defendAbility: 'defendCapability',
      packageSpecification: 'instanceSpec',
      monitorSpec: 'instanceSpec',

    },
  },
}
