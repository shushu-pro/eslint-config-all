export default {
  // 获取产品配置信息列表
  getProducConfigList: {
    url: '/oc/cloud/productGroup/queryProductGroupsByOcDeptId',
  },
  submitApply: {
    url: '/oc/resmng/apply',
    method: 'post',
    reqa: (data, adapter) => {
      const productListAdapter = adapter({
        $strict: false,
        resourceUserInfos: 'resourceUsers',

      }).input

      // eslint-disable-next-line no-restricted-syntax
      for (const key in data) {
        if (/[\w-]+?List$/.test(key)) {
          data[key] = productListAdapter(data[key])
        }
      }

      return adapter.transform({
        $strict: false,
        AntiBotList: {
          originProtectionScheme: Number,
        },
        DDOSIPList: {
          isEnhance: Number,
        },
        AntiDDoSList: {
          defendUrlArr: {
            $key: 'defendUrl',
            $value: value => value.filter(item => item && item.length).join(';'),
          },
        },
      }, data)
    },
    reqa2: {
      $strict: false,
      AntiBotList: {
        originProtectionScheme: Number,

      },
      DDOSIPList: {
        isEnhance: Number,
      },
      AntiDDoSList: {
        defendUrlArr: {
          $key: 'defendUrl',
          $value: value => value.filter(item => item && item.length).join(';'),
        },
      },
    },
    mock2 (...args) {
      // console.info('submitApply', args);
    },
  },
  queryOcDeptList: {
    url: '/oc/uum/deptManage/queryOcDeptList',
    resa: {
      deptId: 'key:key type:String',
      deptName: 'value',
    },
  },
  getOcProjectList: {
    url: '/oc/resmng/ocprojectinfo/allprojectlist',
    resa: {
      projectId: [ { $key: 'key', $type: String }, { $key: 'id', $type: String } ],
      name: 'value',
    },
  },
  getDtDeptList: {
    url: '/oc/resmng/ocdeptmapping/queryDtDeptList',
    reqa: {
      $strict: false,
      deptId: 'ocDeptId',
    },
    resa: {
      cloudDeptId: 'key:key type:String',
      cloudDeptName: 'value',
    },
  },
  getVpcByDt: {
    url: '/oc/resmng/vpcinstance/vpcList',
  },

  // 查询vpc下的虚拟交换机
  getVmByVSwitch: {
    url: '/oc/resmng/vpcswitch/list',
  },

  getApplyOrderDetail: {
    url: 'oc/resmng/detail',
    resa: {
      $strict: false,
      resourceItems: {
        resourceInfo: {
          applyId: [
            true,
            // { $key: 'dtDeptId', $value: () => String(102) }
          ],
        },
      },
    },
  },
}
