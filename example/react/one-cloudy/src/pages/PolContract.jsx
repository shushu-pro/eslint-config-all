import React from 'react'
import { Table, Tooltip } from 'antd'
import { TabsIndex } from '@/components/Common'
import styles from './PolContract.less'

const data = {
  computing: [ {
    productSub: '弹性计算',
    firMergeNumStart: 0,
    firMergeNumEnd: 26,
    children: [ {
      secMergeNumStart: 0,
      secMergeNumEnd: 18,
      productName: '云服务器（ECS）',
      children: [ {
        thrMergeNumStart: 0,
        thrMergeNumEnd: 18,
        accountules: '根据规格及数量按月计费，由弹性伸缩增加的实例按小时计费',
        children: [ {
          purSpec: '1核 1G',
          unitPrice: '30.5',
        },
        {
          purSpec: '1核 2G',
          unitPrice: '55.0',
        },
        {
          purSpec: '1核 4G',
          unitPrice: '107.8',
        },
        {
          purSpec: '1核 8G',
          unitPrice: '259.6',
        },
        {
          purSpec: '2核 4G',
          unitPrice: '109.9',
        },
        {
          purSpec: '2核 8G',
          unitPrice: '264.0',
        },
        {
          purSpec: '2核 16G',
          unitPrice: '382.5',
        },
        {
          purSpec: '4核 8G',
          unitPrice: '267.2',
        },
        {
          purSpec: '4核 16G',
          unitPrice: '412.3',
        },
        {
          purSpec: '4核 32G',
          unitPrice: '805.2',
        },
        {
          purSpec: '8核 16G',
          unitPrice: '534.5',
        },
        {
          purSpec: '8核 32G',
          unitPrice: '824.6',
        },
        {
          purSpec: '8核 64G',
          unitPrice: '1610.4',
        },
        {
          purSpec: '12核 48G',
          unitPrice: '1683.0',
        },
        {
          purSpec: '16核 32G',
          unitPrice: '1733.6',
        },
        {
          purSpec: '16核 64G',
          unitPrice: '2391.0',
        },
        {
          purSpec: '16核 128G',
          unitPrice: '3059.8',
        },
        {
          purSpec: '32核 64G',
          unitPrice: '3467.2',
        },
        {
          purSpec: '32核 128G',
          unitPrice: '4781.9',
        },
        ],
      } ],
    }, {
      secMergeNumStart: 19,
      secMergeNumEnd: 24,
      productName: 'GPU云服务器 ',
      children: [ {
        thrMergeNumStart: 19,
        thrMergeNumEnd: 24,
        accountules: '根据规格及数量按月计费',
        children: [ {
          purSpec: '4核30G,1 * NVIDIA P100',
          unitPrice: '4049.1',
        }, {
          purSpec: '8核60G, 1 * NVIDIA P100',
          unitPrice: '4876.3',
        }, {
          purSpec: '8核60G, 2 * NVIDIA P100',
          unitPrice: '8099.3',
        }, {
          purSpec: '16核120G, 2 * NVIDIA P100',
          unitPrice: '9752.6',
        }, {
          purSpec: '28核112G, 1 * NVIDIA P100',
          unitPrice: '6145.0',
        }, {
          purSpec: '56核224G, 2 * NVIDIA P100',
          unitPrice: '10405.9',
        } ],
      } ],
    }, {
      secMergeNumStart: 25,
      secMergeNumEnd: 25,
      productName: '块存储-高效云盘',
      children: [ {
        thrMergeNumStart: 25,
        thrMergeNumEnd: 25,
        accountules: '根据存储容量按月计费',
        children: [ {
          purSpec: 'GB',
          unitPrice: '0.39',
        } ],
      } ],
    }, {
      secMergeNumStart: 26,
      secMergeNumEnd: 26,
      productName: '块存储-SSD云盘',
      children: [ {
        thrMergeNumStart: 26,
        thrMergeNumEnd: 26,
        accountules: '根据存储容量按月计费',
        children: [ {
          purSpec: 'GB',
          unitPrice: '1.1',
        } ],
      } ],
    } ],
  }, {
    productSub: '容器服务',
    firMergeNumStart: 27,
    firMergeNumEnd: 27,
    children: [ {
      secMergeNumStart: 27,
      secMergeNumEnd: 27,
      productName: '容器服务（ACS）',
      children: [ {
        thrMergeNumStart: 27,
        thrMergeNumEnd: 27,
        accountules: '根据部署容器的ECS节点数按月计费',
        children: [ {
          purSpec: 'ECS节点',
          unitPrice: '267.9',
        } ],
      } ],
    } ],
  } ],
  storage: [ {
    productSub: '对象存储服务',
    firMergeNumStart: 0,
    firMergeNumEnd: 26,
    children: [ {
      secMergeNumStart: 0,
      secMergeNumEnd: 26,
      productName: '对象存储（OSS）',
      children: [ {
        thrMergeNumStart: 0,
        thrMergeNumEnd: 13,
        accountules: '计费项1：根据存储容量包按月计费，超出存储容量包按小时计费',
        children: [ {
          purSpec: '存储容量包规格：40GB',
          unitPrice: '1.1',
        }, {
          purSpec: '存储容量包规格：100GB',
          unitPrice: '12.1',
        }, {
          purSpec: '存储容量包规格：500GB',
          unitPrice: '59.4',
        }, {
          purSpec: '存储容量包规格：1TB',
          unitPrice: '122.1',
        }, {
          purSpec: '存储容量包规格：2TB',
          unitPrice: '243.1',
        }, {
          purSpec: '存储容量包规格：5TB',
          unitPrice: '608.3',
        }, {
          purSpec: '存储容量包规格：10TB',
          unitPrice: '1216.6',
        }, {
          purSpec: '存储容量包规格：20TB',
          unitPrice: '2433.2',
        }, {
          purSpec: '存储容量包规格：50TB',
          unitPrice: '6083.0',
        }, {
          purSpec: '存储容量包规格：100TB',
          unitPrice: '12164.9',
        }, {
          purSpec: '存储容量包规格：200TB',
          unitPrice: '24329.8',
        }, {
          purSpec: '存储容量包规格：300TB',
          unitPrice: '36495.8',
        }, {
          purSpec: '存储容量包规格：500TB',
          unitPrice: '60825.6',
        }, {
          purSpec: '超出存储容量包：GB/小时',
          unitPrice: '0.00018',
        } ],
      }, {
        thrMergeNumStart: 14,
        thrMergeNumEnd: 26,
        accountules: '计费项2：根据互联网下行流量包按月计费，超出流量包的按GB计费',
        children: [
          {
            purSpec: '流量包规格：50G',
            unitPrice: '13.2',
          }, {
            purSpec: '流量包规格：100G',
            unitPrice: '53.9',
          }, {
            purSpec: '流量包规格：300G',
            unitPrice: '162.8',
          }, {
            purSpec: '流量包规格：500G',
            unitPrice: '271.7',
          }, {
            purSpec: '流量包规格：1TB',
            unitPrice: '555.5',
          }, {
            purSpec: '流量包规格：2TB',
            unitPrice: '1111.0',
          }, {
            purSpec: '流量包规格：10TB',
            unitPrice: '5361.4',
          }, {
            purSpec: '流量包规格：30TB',
            unitPrice: '16085.3',
          }, {
            purSpec: '流量包规格：50TB',
            unitPrice: '26808.1',
          }, {
            purSpec: '流量包规格：100TB',
            unitPrice: '47308.8',
          }, {
            purSpec: '流量包规格：300TB',
            unitPrice: '141926.4',
          }, {
            purSpec: '流量包规格：500TB',
            unitPrice: '236544.0',
          }, {
            purSpec: '超出流量包：GB',
            unitPrice: '0.6',
          },
        ],
      } ],
    } ],
  }, {
    productSub: '文件存储服务',
    firMergeNumStart: 27,
    firMergeNumEnd: 39,
    children: [ {
      secMergeNumStart: 27,
      secMergeNumEnd: 39,
      productName: '文件存储（NAS）',
      children: [ {
        thrMergeNumStart: 27,
        thrMergeNumEnd: 39,
        accountules: '根据存储容量包按月计费，超出存储容量包按小时计费',
        children: [ {
          purSpec: '存储容量包规格： 100GB',
          unitPrice: '33.0',
        }, {
          purSpec: '存储容量包规格： 500GB',
          unitPrice: '165.0',
        }, {
          purSpec: '存储容量包规格： 1TB',
          unitPrice: '341.0',
        }, {
          purSpec: '存储容量包规格： 5TB',
          unitPrice: '1694.0',
        }, {
          purSpec: '存储容量包规格： 10TB',
          unitPrice: '3157.0',
        }, {
          purSpec: '存储容量包规格： 30TB',
          unitPrice: '9471.0',
        }, {
          purSpec: '存储容量包规格： 50TB',
          unitPrice: '15774.0',
        }, {
          purSpec: '存储容量包规格： 100TB',
          unitPrice: '30415.0',
        }, {
          purSpec: '存储容量包规格： 200TB',
          unitPrice: '60830.0',
        }, {
          purSpec: '存储容量包规格： 300TB',
          unitPrice: '91245.0',
        }, {
          purSpec: '存储容量包规格： 500TB',
          unitPrice: '152075.0',
        }, {
          purSpec: '存储容量包规格： 1PB',
          unitPrice: '304150.0',
        }, {
          purSpec: '超出容量包：GB/小时',
          unitPrice: '0.00053',
        } ],
      } ],
    } ],
  }, {
    productSub: '表格存储服务',
    firMergeNumStart: 40,
    firMergeNumEnd: 83,
    children: [ {
      secMergeNumStart: 40,
      secMergeNumEnd: 83,
      productName: '表格存储（OTS）',
      children: [ {
        thrMergeNumStart: 40,
        thrMergeNumEnd: 83,
        accountules: '根据存储容量包+读CU容量包+写CU容量包按月计费，超出基础包的按小时计费',
        children: [ {
          purSpec: '容量型存储容量包规格：1TB',
          unitPrice: '236.7',
        }, {
          purSpec: '容量型存储容量包规格：4TB',
          unitPrice: '946.9',
        }, {
          purSpec: '容量型存储容量包规格：8TB',
          unitPrice: '1893.8',
        }, {
          purSpec: '容量型存储容量包规格：10TB',
          unitPrice: '2029.1',
        }, {
          purSpec: '容量型存储容量包规格：40TB',
          unitPrice: '8116.4',
        }, {
          purSpec: '容量型读CU容量包规格：10亿 ',
          unitPrice: '308.0',
        }, {
          purSpec: '容量型读CU容量包规格： 20亿 ',
          unitPrice: '616.0',
        }, {
          purSpec: '容量型读CU容量包规格：  40亿 ',
          unitPrice: '1232.0',
        }, {
          purSpec: '容量型读CU容量包规格：  80亿 ',
          unitPrice: '2464.0',
        }, {
          purSpec: '容量型读CU容量包规格： 100亿 ',
          unitPrice: '2640.0',
        }, {
          purSpec: '容量型读CU容量包规格： 200亿 ',
          unitPrice: '5280.0',
        }, {
          purSpec: '容量型读CU容量包规格： 400亿 ',
          unitPrice: '10560.0',
        }, {
          purSpec: '容量型写CU容量包规格： 10亿 ',
          unitPrice: '154.0',
        }, {
          purSpec: '容量型写CU容量包规格： 20亿 ',
          unitPrice: '308.0',
        }, {
          purSpec: '容量型写CU容量包规格： 40亿 ',
          unitPrice: '616.0',
        }, {
          purSpec: '容量型写CU容量包规格： 80亿 ',
          unitPrice: '1232.0',
        }, {
          purSpec: '容量型写CU容量包规格： 100亿 ',
          unitPrice: '1320.0',
        }, {
          purSpec: '容量型写CU容量包规格： 200亿 ',
          unitPrice: '2640.0',
        }, {
          purSpec: '容量型写CU容量包规格： 400亿 ',
          unitPrice: '5280.0',
        }, {
          purSpec: '超出容量型存储资源包：GB/小时',
          unitPrice: '0.00046',
        }, {
          purSpec: '超出容量型读CU资源包：万CU/小时',
          unitPrice: '0.00440',
        }, {
          purSpec: '超出容量型写CU资源包：万CU/小时',
          unitPrice: '0.00220',
        }, {
          purSpec: '高性能型存储容量包规格： 1TB',
          unitPrice: '912.4',
        }, {
          purSpec: '高性能型存储容量包规格： 4TB',
          unitPrice: '3649.5',
        }, {
          purSpec: '高性能型存储容量包规格： 8TB',
          unitPrice: '7299.1',
        }, {
          purSpec: '高性能型存储容量包规格： 10TB',
          unitPrice: '8515.6',
        }, {
          purSpec: '高性能型存储容量包规格： 40TB',
          unitPrice: '34062.3',
        }, {
          purSpec: '高性能型读CU容量包规格： 10亿',
          unitPrice: '770.0',
        }, {
          purSpec: '高性能型读CU容量包规格： 20亿',
          unitPrice: '1540.0',
        }, {
          purSpec: '高性能型读CU容量包规格： 40亿',
          unitPrice: '3080.0',
        }, {
          purSpec: '高性能型读CU容量包规格： 80亿',
          unitPrice: '6160.0',
        }, {
          purSpec: '高性能型读CU容量包规格： 100亿',
          unitPrice: '6600.0',
        }, {
          purSpec: '高性能型读CU容量包规格： 200亿',
          unitPrice: '13200.0',
        }, {
          purSpec: '高性能型读CU容量包规格： 400亿',
          unitPrice: '26400.0',
        }, {
          purSpec: '高性能型写CU容量包规格： 10亿',
          unitPrice: '1540.0',
        }, {
          purSpec: '高性能型写CU容量包规格： 20亿',
          unitPrice: '3080.0',
        }, {
          purSpec: '高性能型写CU容量包规格： 40亿',
          unitPrice: '6160.0',
        }, {
          purSpec: '高性能型写CU容量包规格： 80亿',
          unitPrice: '12320.0',
        }, {
          purSpec: '高性能型写CU容量包规格： 100亿',
          unitPrice: '13200.0',
        }, {
          purSpec: '高性能型写CU容量包规格： 200亿',
          unitPrice: '26400.0',
        }, {
          purSpec: '高性能型写CU容量包规格： 400亿',
          unitPrice: '52800.0',
        }, {
          purSpec: '超出高性能型存储资源包： GB/小时',
          unitPrice: '0.00165',
        }, {
          purSpec: '超出高性能型读CU资源包： 万CU/小时',
          unitPrice: '0.01100',
        }, {
          purSpec: '超出高性能型写CU资源包： 万CU/小时',
          unitPrice: '0.02200',
        } ],
      } ],
    } ],
  } ],
  network: [ {
    productSub: '虚拟专网(vpc)',
    firMergeNumStart: 0,
    firMergeNumEnd: 19,
    children: [ {
      secMergeNumStart: 0,
      secMergeNumEnd: 0,
      productName: '专有网络（VPC）',
      children: [ {
        thrMergeNumStart: 0,
        thrMergeNumEnd: 0,
        accountules: '根据VPC个数按月计费',
        children: [ {
          purSpec: '实例',
          unitPrice: '44.0',
        } ],
      } ],
    }, {
      secMergeNumStart: 1,
      secMergeNumEnd: 7,
      productName: '弹性公网IP（EIP）',
      children: [ {
        thrMergeNumStart: 1,
        thrMergeNumEnd: 7,
        accountules: '根据实例个数和带宽按月计费',
        children: [ {
          purSpec: '实例',
          unitPrice: '15.8',
        }, {
          purSpec: '带宽费：1Mbps',
          unitPrice: '25.3',
        }, {
          purSpec: '带宽费：2Mbps',
          unitPrice: '50.6',
        }, {
          purSpec: '带宽费：3Mbps',
          unitPrice: '78.1',
        }, {
          purSpec: '带宽费：4Mbps',
          unitPrice: '105.6',
        }, {
          purSpec: '带宽费：5Mbps',
          unitPrice: '137.5',
        }, {
          purSpec: '带宽费：6 Mbps及其以上',
          unitPrice: '137.5+(n-5)x88',
        } ],
      } ],
    }, {
      secMergeNumStart: 8,
      secMergeNumEnd: 17,
      productName: 'NAT网关',
      children: [ {
        thrMergeNumStart: 8,
        thrMergeNumEnd: 17,
        accountules: '根据实例类型数量+公网IP数+带宽按月计费',
        children: [ {
          purSpec: '规格1：小型',
          unitPrice: '40.2',
        }, {
          purSpec: '规格2：中型',
          unitPrice: '40.2',
        }, {
          purSpec: '规格3：大型',
          unitPrice: '40.2',
        }, {
          purSpec: '公网IP数：个',
          unitPrice: '15.8',
        }, {
          purSpec: '带宽费：1Mbps',
          unitPrice: '25.3',
        }, {
          purSpec: '带宽费：2Mbps',
          unitPrice: '50.6',
        }, {
          purSpec: '带宽费：3Mbps',
          unitPrice: '78.1',
        }, {
          purSpec: '带宽费：4Mbps',
          unitPrice: '105.6',
        }, {
          purSpec: '带宽费：5Mbps',
          unitPrice: '137.5',
        }, {
          purSpec: '带宽费：6 Mbps及其以上',
          unitPrice: '137.5+(n-5)x88',
        } ],
      } ],
    }, {
      secMergeNumStart: 18,
      secMergeNumEnd: 19,
      productName: '高速通道',
      children: [ {
        thrMergeNumStart: 18,
        thrMergeNumEnd: 19,
        accountules: '根据规格和数量按月计费（注：跨region的带宽不收费）',
        children: [ {
          purSpec: '规格1：同region',
          unitPrice: '40.2',
        }, {
          purSpec: '规格2：跨region',
          unitPrice: '40.2',
        } ],
      } ],
    } ],
  }, {
    productSub: '软件负载均衡',
    firMergeNumStart: 20,
    firMergeNumEnd: 26,
    children: [ {
      secMergeNumStart: 20,
      secMergeNumEnd: 26,
      productName: '负载均衡（SLB）',
      children: [ {
        thrMergeNumStart: 20,
        thrMergeNumEnd: 26,
        accountules: '计费方式：根据实例个数+带宽按月计费',
        children: [ {
          purSpec: '实例',
          unitPrice: '15.8',
        }, {
          purSpec: '带宽费：1Mbps',
          unitPrice: '25.3',
        }, {
          purSpec: '带宽费：2Mbps',
          unitPrice: '50.6',
        }, {
          purSpec: '带宽费：3Mbps',
          unitPrice: '78.1',
        }, {
          purSpec: '带宽费：4Mbps',
          unitPrice: '105.6',
        }, {
          purSpec: '带宽费：5Mbps',
          unitPrice: '137.5',
        }, {
          purSpec: '带宽费：6 Mbps及其以上',
          unitPrice: '137.5+(n-5)x88',
        } ],
      } ],
    } ],
  } ],
  database: [
    {
      productSub: '关系型数据库服务',
      firMergeNumStart: 0,
      firMergeNumEnd: 105,
      children: [
        {
          secMergeNumStart: 0,
          secMergeNumEnd: 19,
          productName: '云数据库RDS MySQL版（RDS for MySQL）',
          children: [ {
            thrMergeNumStart: 0,
            thrMergeNumEnd: 19,
            accountules: '根据实例规格和个数+存储空间按月计费',
            children: [ {
              purSpec: '1核1G（共享型，连接数300）',
              unitPrice: '154.0',
            },
            {
              purSpec: '1核2G（共享型，连接数600）',
              unitPrice: '154.0',
            },
            {
              purSpec: '2核4G（共享型，连接数1200）',
              unitPrice: '550.0',
            },
            {
              purSpec: '2核8G（共享型，连接数2000）',
              unitPrice: '990.0',
            },
            {
              purSpec: '4核8G（共享型，连接数2000）',
              unitPrice: '1045.0',
            },
            {
              purSpec: '4核16G（共享型，连接数4000）',
              unitPrice: '1870.0',
            },
            {
              purSpec: '8核16G（共享型，连接数4000）',
              unitPrice: '1980.0',
            },
            {
              purSpec: '8核32G（共享型，连接数8000）',
              unitPrice: '3630.0',
            },
            {
              purSpec: '16核64G（共享型，连接数16000）',
              unitPrice: '7150.0',
            },
            {
              purSpec: '16核96G（共享型，连接数24000）',
              unitPrice: '10670.0',
            },
            {
              purSpec: '存储空间： GB',
              unitPrice: '0.9',
            },
            {
              purSpec: '2核16G,250GB Disk（独享型，连接数2500）',
              unitPrice: '2035.0',
            },
            {
              purSpec: '4核32G,500GB Disk（独享型，连接数5000）',
              unitPrice: '4015.0',
            },
            {
              purSpec: '8核64G,1000GB Disk（独享型，连接数10000）',
              unitPrice: '7920.0',
            },
            {
              purSpec: '16核128G,2000GB Disk（独享型，连接数20000）',
              unitPrice: '15840.0',
            },
            {
              purSpec: '4核16G,250GB Disk（独享型，连接数2500）',
              unitPrice: '2530.0',
            },
            {
              purSpec: '8核32G,500GB Disk（独享型，连接数5000）',
              unitPrice: '4950.0',
            },
            {
              purSpec: '16核64G,1000GB Disk（独享型，连接数10000）',
              unitPrice: '9680.0',
            },
            {
              purSpec: '32核128G,2000GB Disk（独享型，连接数20000）',
              unitPrice: '19360.0',
            },
            {
              purSpec: '30核220G,3000GB Disk（独占物理机，连接数64000）',
              unitPrice: '31240.0',
            },
            ],
          } ],
        }, {
          secMergeNumStart: 20,
          secMergeNumEnd: 28,
          productName: '云数据库RDS MySQL版只读实例（RDSfor MySQL） ',
          children: [ {
            thrMergeNumStart: 20,
            thrMergeNumEnd: 28,
            accountules: '根据实例规格和个数+存储空间按月计费',
            children: [ {
              purSpec: '2核16G,250GB Disk（独享型，连接数2500）',
              unitPrice: '2035.0',
            }, {
              purSpec: '4核32G,500GB Disk（独享型，连接数5000）',
              unitPrice: '4015.0',
            }, {
              purSpec: '8核64G,1000GB Disk（独享型，连接数10000）',
              unitPrice: '7920.0',
            }, {
              purSpec: '16核128G,2000GB Disk（独享型，连接数20000）',
              unitPrice: '15840.0',
            }, {
              purSpec: '4核16G,250GB Disk（独享型，连接数2500）',
              unitPrice: '2530.0',
            }, {
              purSpec: '8核32G,500GB Disk（独享型，连接数5000）',
              unitPrice: '4950.0',
            }, {
              purSpec: '16核64G,1000GB Disk（独享型，连接数10000）',
              unitPrice: '9680.0',
            }, {
              purSpec: '32核128G,2000GB Disk（独享型，连接数20000）',
              unitPrice: '19360.0',
            }, {
              purSpec: '30核220G,3000GB Disk（独占物理机，连接数64000）',
              unitPrice: '31240.0',
            },
            ],
          } ],
        }, {
          secMergeNumStart: 29,
          secMergeNumEnd: 43,
          productName: '云数据库RDS SQL Server版（RDS for SQLServer）',
          children: [ {
            thrMergeNumStart: 29,
            thrMergeNumEnd: 43,
            accountules: '根据实例规格和个数+存储空间按月计费',
            children: [
              {
                purSpec: '1核2G（共享型，连接数600）',
                unitPrice: '462.0',
              }, {
                purSpec: '2核4G（共享型，连接数1200）',
                unitPrice: '472.3',
              }, {
                purSpec: '2核8G（共享型，连接数2000）',
                unitPrice: '499.1',
              }, {
                purSpec: '4核8G（共享型，连接数2000）',
                unitPrice: '834.0',
              }, {
                purSpec: '4核16G（共享型，连接数4000）',
                unitPrice: '887.6',
              }, {
                purSpec: '8核16G（共享型，连接数4000）',
                unitPrice: '1584.1',
              }, {
                purSpec: '8核32G（共享型，连接数8000）',
                unitPrice: '1691.3',
              }, {
                purSpec: '16核64G（共享型，连接数16000）',
                unitPrice: '3298.7',
              }, {
                purSpec: '16核96G（共享型，连接数24000）',
                unitPrice: '26400.0',
              }, {
                purSpec: '存储空间：GB',
                unitPrice: '0.9',
              }, {
                purSpec: '2核16G,250GB Disk（独享型）',
                unitPrice: '4510.0',
              }, {
                purSpec: '4核32G,500GB Disk（独享型）',
                unitPrice: '9020.0',
              }, {
                purSpec: '8核64G,1000GB Disk（独享型）',
                unitPrice: '17930.0',
              }, {
                purSpec: '16核128G,2000GB Disk（独享型）',
                unitPrice: '34760.0',
              }, {
                purSpec: '30核220G,2000GB Disk（独占物理机）',
                unitPrice: '47960.0',
              },
            ],
          } ],
        }, {
          secMergeNumStart: 44,
          secMergeNumEnd: 64,
          productName: '云数据库RDS PostgreSQL版（RDS for PostgreSQL）',
          children: [ {
            thrMergeNumStart: 44,
            thrMergeNumEnd: 64,
            accountules: '根据实例规格和个数+存储空间按月计费',
            children: [ {
              purSpec: '1核1G（共享型，连接数2000）',
              unitPrice: '154.0',
            }, {
              purSpec: '1核2G（共享型，连接数2000）',
              unitPrice: '286.0',
            }, {
              purSpec: '2核4G（共享型，连接数2000）',
              unitPrice: '550.0',
            }, {
              purSpec: '4核8G（共享型，连接数2000）',
              unitPrice: '1045.0',
            }, {
              purSpec: '8核16G（共享型，连接数2000）',
              unitPrice: '1980.0',
            }, {
              purSpec: '8核32G（共享型，连接数2000）',
              unitPrice: '3630.0',
            }, {
              purSpec: '16核64G（共享型，连接数2000）',
              unitPrice: '7150.0',
            }, {
              purSpec: '存储空间：GB',
              unitPrice: '0.9',
            }, {
              purSpec: '2核16G,250GB Disk（独享型，连接数2500）',
              unitPrice: '2035.0',
            }, {
              purSpec: '4核32G,500GB Disk（独享型，连接数5000）',
              unitPrice: '4015.0',
            }, {
              purSpec: '8核64G,1000GB Disk（独享型，连接数10000）',
              unitPrice: '7920.0',
            }, {
              purSpec: '16核128G,2000GB Disk（独享型，连接数12000）',
              unitPrice: '15840.0',
            }, {
              purSpec: '4核16G,250GB Disk（独享型，连接数2500）',
              unitPrice: '2585.0',
            }, {
              purSpec: '4核16G,500GB Disk（独享型，连接数2500）',
              unitPrice: '2860.0',
            }, {
              purSpec: '8核32G,500GB Disk（独享型，连接数5000）',
              unitPrice: '4983.0',
            }, {
              purSpec: '8核32G,1000GB Disk（独享型，连接数5000）',
              unitPrice: '5423.0',
            }, {
              purSpec: '16核64G,1000GB Disk（独享型，连接数10000）',
              unitPrice: '9713.0',
            }, {
              purSpec: '16核64G,2000GB Disk（独享型，连接数10000）',
              unitPrice: '10593.0',
            }, {
              purSpec: '32核128G,2000GB Disk（独享型，连接数12000）',
              unitPrice: '19393.0',
            }, {
              purSpec: '32核128G,3000GB Disk（独享型，连接数12000）',
              unitPrice: '20273.0',
            }, {
              purSpec: '30核220G,3000GB Disk（独占物理机，连接数4000）',
              unitPrice: '31273.0',
            } ],
          } ],
        }, {
          secMergeNumStart: 65,
          secMergeNumEnd: 92,
          productName: '云数据库RDS PPAS版（RDS for PPAS）',
          children: [ {
            thrMergeNumStart: 65,
            thrMergeNumEnd: 92,
            accountules: '根据实例规格和个数+存储空间按月计费',
            children: [
              {
                purSpec: '1核1G（共享型，连接数100）',
                unitPrice: '495.0',
              }, {
                purSpec: '1核2G（共享型，连接数200）',
                unitPrice: '660.0',
              }, {
                purSpec: '2核4G（共享型，连接数400）',
                unitPrice: '990.0',
              }, {
                purSpec: '4核8G（共享型，连接数800）',
                unitPrice: '1760.0',
              }, {
                purSpec: '4核16G（共享型，连接数1500）',
                unitPrice: '3300.0',
              }, {
                purSpec: '8核32G（共享型，连接数2000）',
                unitPrice: '6380.0',
              }, {
                purSpec: '16核64G（共享型，连接数2000）',
                unitPrice: '12100.0',
              }, {
                purSpec: 'GB',
                unitPrice: '0.9',
              }, {
                purSpec: '1核4G,250GB Disk（独享型，连接数200）',
                unitPrice: '1540.0',
              }, {
                purSpec: '2核8G,250GB Disk（独享型，连接数400）',
                unitPrice: '2860.0',
              }, {
                purSpec: '4核16G,250GB Disk（独享型，连接数2500）',
                unitPrice: '5500.0',
              }, {
                purSpec: '4核16G,500GB Disk（独享型，连接数2500）',
                unitPrice: '5940.0',
              }, {
                purSpec: '8核32G,500GB Disk（独享型，连接数5000）',
                unitPrice: '11000.0',
              }, {
                purSpec: '8核32G,1000GB Disk（独享型，连接数5000）',
                unitPrice: '11440.0',
              }, {
                purSpec: '16核64G,1000GB Disk（独享型，连接数10000）',
                unitPrice: '22000.0',
              }, {
                purSpec: '16核64G,2000GB Disk（独享型，连接数10000）',
                unitPrice: '22880.0',
              }, {
                purSpec: '32核128G,2000GB Disk（独享型，连接数12000）',
                unitPrice: '44000.0',
              }, {
                purSpec: '32核128G,3000GB Disk（独享型，连接数12000）',
                unitPrice: '44880.0',
              }, {
                purSpec: '2核16G,250GB Disk（独享型，连接数2500）',
                unitPrice: '3410.0',
              }, {
                purSpec: '4核32G,250GB Disk（独享型，连接数5000）',
                unitPrice: '6490.0',
              }, {
                purSpec: '4核32G,500GB Disk（独享型，连接数5000）',
                unitPrice: '6710.0',
              }, {
                purSpec: '8核64G,500GB Disk（独享型，连接数10000）',
                unitPrice: '12430.0',
              }, {
                purSpec: '8核64G,1000GB Disk（独享型，连接数10000）',
                unitPrice: '12870.0',
              }, {
                purSpec: '16核128G,1000GB Disk（独享型，连接数12000）',
                unitPrice: '22880.0',
              }, {
                purSpec: '16核128G,2000GB Disk（独享型，连接数12000）',
                unitPrice: '23760.0',
              }, {
                purSpec: '32核256G,2000GB Disk（独享型，连接数12000）',
                unitPrice: '45760.0',
              }, {
                purSpec: '32核256G,3000GB Disk（独享型，连接数12000）',
                unitPrice: '46640.0',
              }, {
                purSpec: '30核220G,3000GB Disk（独占物理机，连接数4000）',
                unitPrice: '57640.0',
              },
            ],
          } ],
        }, {
          secMergeNumStart: 93,
          secMergeNumEnd: 99,
          productName: '云数据库RDS OSQL版（RDS for OSQL）',
          children: [ {
            thrMergeNumStart: 93,
            thrMergeNumEnd: 99,
            accountules: '根据实例规格和个数+存储空间按月计费',
            children: [ {
              purSpec: '4核CPU,32G内存（独享型）',
              unitPrice: '3575.0',
            }, {
              purSpec: '8核CPU,64G内存（独享型）',
              unitPrice: '7040.0',
            }, {
              purSpec: '16核CPU,128G内存（独享型）',
              unitPrice: '14080.0',
            }, {
              purSpec: '24核CPU,192G内存（独享型）',
              unitPrice: '19716.4',
            }, {
              purSpec: '32核CPU,256G内存（独享型）',
              unitPrice: '25555.2',
            }, {
              purSpec: '56核CPU,480G内存（独享型）',
              unitPrice: '41411.7',
            }, {
              purSpec: 'GB',
              unitPrice: '0.9',
            } ],
          } ],
        }, {
          secMergeNumStart: 100,
          secMergeNumEnd: 105,
          productName: '数据库备份',
          children: [ {
            thrMergeNumStart: 100,
            thrMergeNumEnd: 105,
            accountules: '根据备份空间容量包按月计费，超出容量包的部分按小时计费',
            children: [ {
              purSpec: '容量包：100GB',
              unitPrice: '29.3',
            }, {
              purSpec: '容量包：200GB',
              unitPrice: '58.6',
            }, {
              purSpec: '容量包：500GB',
              unitPrice: '146.5',
            }, {
              purSpec: '容量包：1TB',
              unitPrice: '300.1',
            }, {
              purSpec: '容量包：2TB',
              unitPrice: '600.1',
            }, {
              purSpec: '超出存储容量包：GB/小时',
              unitPrice: '0.00122',
            } ],
          } ],
        },
      ],
    }, {
      productSub: 'NoSQL数据库服务',
      firMergeNumStart: 106,
      firMergeNumEnd: 128,
      children: [ {
        secMergeNumStart: 106,
        secMergeNumEnd: 116,
        productName: '云数据库Redis版',
        children: [ {
          thrMergeNumStart: 106,
          thrMergeNumEnd: 116,
          accountules: '根据实例规格和个数按月计费',
          children: [ {
            purSpec: '规格1：标准版1G，连接数20000',
            unitPrice: '110.0',
          }, {
            purSpec: '规格2：标准版2G，连接数20000',
            unitPrice: '198.0',
          }, {
            purSpec: '规格3：标准版4G，连接数20000',
            unitPrice: '374.0',
          }, {
            purSpec: '规格4：标准版8G，连接数20000',
            unitPrice: '726.0',
          }, {
            purSpec: '规格5：标准版16G，连接数20000',
            unitPrice: '1430.0',
          }, {
            purSpec: '规格6：标准版32G，连接数20000',
            unitPrice: '2838.0',
          }, {
            purSpec: '规格7：集群版16G，连接数80000',
            unitPrice: '1650.0',
          }, {
            purSpec: '规格8：集群版32G，连接数80000',
            unitPrice: '3300.0',
          }, {
            purSpec: '规格9：集群版64G，连接数80000',
            unitPrice: '6600.0',
          }, {
            purSpec: '规格10：集群版128G，连接数160000',
            unitPrice: '13200.0',
          }, {
            purSpec: '规格11：集群版256G，连接数160000',
            unitPrice: '26400.0',
          } ],
        } ],
      }, {
        secMergeNumStart: 117,
        secMergeNumEnd: 128,
        productName: '云数据库MongoDB版（MongoDB）',
        children: [ {
          thrMergeNumStart: 117,
          thrMergeNumEnd: 128,
          accountules: '根据实例规格和个数+存储空间按月计费',
          children: [ {
            purSpec: '规格1：三副本共享，1核2G，连接数200',
            unitPrice: '330.0',
          }, {
            purSpec: '规格2：三副本共享，2核4G，连接数400',
            unitPrice: '660.0',
          }, {
            purSpec: '规格3：三副本共享，4核8G，连接数1000',
            unitPrice: '1210.0',
          }, {
            purSpec: '规格4：三副本共享，8核16G，连接数2000',
            unitPrice: '2310.0',
          }, {
            purSpec: '规格5：三副本共享，8核32G，连接数4000',
            unitPrice: '4400.0',
          }, {
            purSpec: '规格6：三副本共享，16核64G，连接数8000',
            unitPrice: '8800.0',
          }, {
            purSpec: '规格7：独享，2核16G，连接数2500',
            unitPrice: '1760.0',
          }, {
            purSpec: '规格8：独享，4核32G，连接数5000',
            unitPrice: '3410.0',
          }, {
            purSpec: '规格9：独享，8核64G，连接数10000',
            unitPrice: '6710.0',
          }, {
            purSpec: '规格10：独享，16核128G，连接数20000',
            unitPrice: '13200.0',
          }, {
            purSpec: '规格11：独享，32核256G，连接数40000',
            unitPrice: '26400.0',
          }, {
            purSpec: '存储空间：GB',
            unitPrice: '2.5',
          } ],
        } ],
      } ],
    }, {
      productSub: '分布式关系型数据库（DRDS）',
      firMergeNumStart: 129,
      firMergeNumEnd: 160,
      children: [ {
        secMergeNumStart: 129,
        secMergeNumEnd: 135,
        productName: '分布式关系型数据库入门版',
        children: [ {
          thrMergeNumStart: 129,
          thrMergeNumEnd: 135,
          accountules: '根据实例规格和个数按月计费',
          children: [
            {
              purSpec: '实例规格：8核16GB',
              unitPrice: '1817.2',
            }, {
              purSpec: '实例规格：12核24GB',
              unitPrice: '3291.2',
            }, {
              purSpec: '实例规格：16核32GB',
              unitPrice: '4312.0',
            }, {
              purSpec: '实例规格：20核40GB',
              unitPrice: '5331.7',
            }, {
              purSpec: '实例规格：24核48GB',
              unitPrice: '6352.5',
            }, {
              purSpec: '实例规格：28核56GB',
              unitPrice: '7372.2',
            }, {
              purSpec: '实例规格：32核64GB',
              unitPrice: '8393.0',
            },
          ],
        } ],
      }, {
        secMergeNumStart: 136,
        secMergeNumEnd: 150,
        productName: '分布式关系型数据库标准版',
        children: [ {
          thrMergeNumStart: 136,
          thrMergeNumEnd: 150,
          accountules: '根据实例规格和个数按月计费',
          children: [ {
            purSpec: '实例规格：16核32GB',
            unitPrice: '4374.7',
          }, {
            purSpec: '实例规格：24核48GB',
            unitPrice: '6443.8',
          }, {
            purSpec: '实例规格：32核64GB',
            unitPrice: '8512.9',
          }, {
            purSpec: '实例规格：40核80GB',
            unitPrice: '10318.0',
          }, {
            purSpec: '实例规格：48核96GB',
            unitPrice: '12335.4',
          }, {
            purSpec: '实例规格：56核112GB',
            unitPrice: '14352.8',
          }, {
            purSpec: '实例规格：64核128GB',
            unitPrice: '16370.2',
          }, {
            purSpec: '实例规格：72核144GB',
            unitPrice: '18387.6',
          }, {
            purSpec: '实例规格：80核160GB',
            unitPrice: '20405.0',
          }, {
            purSpec: '实例规格：88核176GB',
            unitPrice: '22422.4',
          }, {
            purSpec: '实例规格：96核192GB',
            unitPrice: '24439.8',
          }, {
            purSpec: '实例规格：104核208GB',
            unitPrice: '26457.2',
          }, {
            purSpec: '实例规格：112核224GB',
            unitPrice: '28474.6',
          }, {
            purSpec: '实例规格：120核240GB',
            unitPrice: '30492.0',
          }, {
            purSpec: '实例规格：128核256GB',
            unitPrice: '32509.4',
          } ],
        } ],
      }, {
        secMergeNumStart: 151,
        secMergeNumEnd: 160,
        productName: '分布式关系型数据库企业版',
        children: [ {
          thrMergeNumStart: 151,
          thrMergeNumEnd: 160,
          accountules: '根据实例规格和个数按月计费',
          children: [ {
            purSpec: '实例规格：32核64GB',
            unitPrice: '8688.9',
          }, {
            purSpec: '实例规格：64核128GB',
            unitPrice: '16694.7',
          }, {
            purSpec: '实例规格：80核160GB',
            unitPrice: '20809.8',
          }, {
            purSpec: '实例规格：96核192GB',
            unitPrice: '24923.8',
          }, {
            purSpec: '实例规格：112核224GB',
            unitPrice: '28671.5',
          }, {
            purSpec: '实例规格：128核256GB',
            unitPrice: '32733.8',
          }, {
            purSpec: '实例规格：144核288GB',
            unitPrice: '36336.3',
          }, {
            purSpec: '实例规格：160核320GB',
            unitPrice: '40348.0',
          }, {
            purSpec: '实例规格：176核352GB',
            unitPrice: '44359.7',
          }, {
            purSpec: '实例规格：192核384GB',
            unitPrice: '48371.4',
          } ],
        } ],
      } ],
    }, {
      productSub: '数据仓库服务',
      firMergeNumStart: 161,
      firMergeNumEnd: 171,
      children: [
        {
          secMergeNumStart: 161,
          secMergeNumEnd: 163,
          productName: 'AnalyticDB for PostgreSQL（原gpdb）',
          children: [ {
            thrMergeNumStart: 161,
            thrMergeNumEnd: 163,
            accountules: '根据实例规格和个数按月计费',
            children: [ {
              purSpec:	'规格1：1核8G内存80GB SSD硬盘',
              unitPrice: '576.0',
            }, {
              purSpec:	'规格2：2核16G内存160GB SSD硬盘',
              unitPrice: '1152.0',
            }, {
              purSpec:	'规格3：16核128G内存1.28TB SSD硬盘',
              unitPrice: '9215.7',
            } ],
          } ],
        }, {
          secMergeNumStart: 164,
          secMergeNumEnd: 166,
          productName: 'HybridDB for MySQL（原PetaData）',
          children: [ {
            thrMergeNumStart: 164,
            thrMergeNumEnd: 165,
            accountules: '根据实例规格和个数按月计费',
            children: [ {
              purSpec: '规格1：4核4G内存200GB硬盘',
              unitPrice: '1100.0',
            }, {
              purSpec: '规格2：8核32G内存512GB硬盘',
              unitPrice: '2416.7',
            } ],
          }, {
            thrMergeNumStart: 166,
            thrMergeNumEnd: 166,
            accountules: '根据备份存储空间按月计费',
            children: [ {
              purSpec: '备份空间：GB',
              unitPrice: '0.2',
            } ],
          } ],
        }, {
          secMergeNumStart: 167,
          secMergeNumEnd: 171,
          productName: '分析型数据库MySQL版（AnalyticDB for MySQL）（原ADS）',
          children: [ {
            thrMergeNumStart: 167,
            thrMergeNumEnd: 171,
            accountules: '根据实例规格和个数按月计费',
            children: [ {
              purSpec: '规格1:C1:1CORE，7.5GB内存， 60GB SSD',
              unitPrice: '495.0',
            }, {
              purSpec: '规格2:C4:3CORE,30G内存，180G SSD',
              unitPrice: '1023.0',
            }, {
              purSpec: '规格3:C8:4CORE ,45G内存，480G SSD',
              unitPrice: '2622.4',
            }, {
              purSpec: '规格4:C12:12CORE,60G内存，600G SSD',
              unitPrice: '3193.3',
            }, {
              purSpec: '规格5:S8N:6CORE,120G内存，1024G SSD,12288G SATA',
              unitPrice: '5602.3',
            } ],
          } ],
        } ],
    }, {
      productSub: '数据库管理服务',
      firMergeNumStart: 172,
      firMergeNumEnd: 175,
      children: [ {
        secMergeNumStart: 172,
        secMergeNumEnd: 174,
        productName: '数据传输服务（DTS）',
        children: [ {
          thrMergeNumStart: 172,
          thrMergeNumEnd: 174,
          accountules: '根据实例规格和个数按月计费',
          children: [ {
            purSpec: '数据同步',
            unitPrice: '1325.5',
          }, {
            purSpec: '数据不停服迁移',
            unitPrice: '1325.5',
          }, {
            purSpec: '数据订阅',
            unitPrice: '792.0',
          } ],
        } ],
      }, {
        secMergeNumStart: 175,
        secMergeNumEnd: 175,
        productName: '数据管理（DMS）',
        children: [ {
          thrMergeNumStart: 175,
          thrMergeNumEnd: 175,
          accountules: '根据租户开通的用户数+实例数按月计费',
          children: [ {
            purSpec: '规格：100用户+50实例',
            unitPrice: '133.9',
          } ],
        } ],
      } ],
    },
  ],
  bigdata: [
    {
      productSub: '大数据计算服务',
      firMergeNumStart: 0,
      firMergeNumEnd: 3,
      children: [
        {
          secMergeNumStart: 0,
          secMergeNumEnd: 1,
          productName: '大数据计算服务（MaxCompute）（原ODPS）',
          children: [ {
            thrMergeNumStart: 0,
            thrMergeNumEnd: 1,
            accountules: '根据实例开通的CU数+存储容量按月计费（20CU+1TB起步）',
            children: [ {
              purSpec: '计费项1：CU',
              unitPrice: '165.0',
            }, {
              purSpec: '计费项1：GB',
              unitPrice: '0.3',
            } ],
          } ],
        }, {
          secMergeNumStart: 2,
          secMergeNumEnd: 2,
          productName: '实时计算（Blink）',
          children: [ {
            thrMergeNumStart: 2,
            thrMergeNumEnd: 2,
            accountules: '根据任务CU数按月计费',
            children: [ {
              purSpec: 'CU',
              unitPrice: '198.0',
            } ],
          } ],
        }, {
          secMergeNumStart: 3,
          secMergeNumEnd: 3,
          productName: 'E-MapReduce（EMR）',
          children: [ {
            thrMergeNumStart: 3,
            thrMergeNumEnd: 3,
            accountules: '根据任务消耗的CPU数按月计费',
            children: [ {
              purSpec: 'CPU数',
              unitPrice: '303.8',
            } ],
          } ],
        },
      ],
    }, {
      productSub: '大数据搜索与分析',
      firMergeNumStart: 4,
      firMergeNumEnd: 19,
      children: [
        {
          secMergeNumStart: 4,
          secMergeNumEnd: 15,
          productName: '日志服务（Log Service）（原SLS）',
          children: [ {
            thrMergeNumStart: 4,
            thrMergeNumEnd: 15,
            accountules: '根据实例的存储容量包+流量包按月计费，超出容量包按小时计费/超出流量包按GB计费',
            children: [
              {
                purSpec: '存储容量包：100GB',
                unitPrice: '37.4',
              }, {
                purSpec: '存储容量包：1TB',
                unitPrice: '355.3',
              }, {
                purSpec: '存储容量包：10TB',
                unitPrice: '3351.7',
              }, {
                purSpec: '存储容量包：100TB',
                unitPrice: '33510.4',
              }, {
                purSpec: '存储容量包：1000TB',
                unitPrice: '335104.0',
              }, {
                purSpec: '超出存储包后：GB/小时',
                unitPrice: '0.00053',
              }, {
                purSpec: '流量包：100GB',
                unitPrice: '58.3',
              }, {
                purSpec: '流量包：1TB',
                unitPrice: '597.3',
              }, {
                purSpec: '流量包：10TB',
                unitPrice: '5969.7',
              }, {
                purSpec: '流量包：100TB',
                unitPrice: '59699.2',
              }, {
                purSpec: '流量包：1000TB',
                unitPrice: '596992.0',
              }, {
                purSpec: '超出流量包后：GB',
                unitPrice: '0.6',
              },
            ],
          } ],
        }, {
          secMergeNumStart: 16,
          secMergeNumEnd: 16,
          productName: 'I+关系网络分析',
          children: [ {
            thrMergeNumStart: 16,
            thrMergeNumEnd: 16,
            accountules: '根据实例个数按月计费',
            children: [ {
              purSpec: '实例个数',
              unitPrice: '40185.0',
            } ],
          } ],
        }, {
          secMergeNumStart: 17,
          secMergeNumEnd: 17,
          productName: '机器学习（PAI）',
          children: [ {
            thrMergeNumStart: 17,
            thrMergeNumEnd: 17,
            accountules: '按照功能开通账号收费',
            children: [ {
              purSpec: '每账号',
              unitPrice: '22000.0',
            } ],
          } ],
        }, {
          secMergeNumStart: 18,
          secMergeNumEnd: 19,
          productName: 'Quick BI',
          children: [ {
            thrMergeNumStart: 18,
            thrMergeNumEnd: 19,
            accountules: '按用户账号数计费（租户开通智能BI功能后，起始用户数量为30，超过30用户后以10用户为一个计价单位）',
            children: [ {
              purSpec: '初始规格：30用户',
              unitPrice: '1969.0',
            }, {
              purSpec: '增量包：10用户',
              unitPrice: '984.5',
            } ],
          } ],
        },
      ],
    }, {
      productSub: 'DataWorks',
      firMergeNumStart: 20,
      firMergeNumEnd: 37,
      children: [ {
        secMergeNumStart: 20,
        secMergeNumEnd: 20,
        productName: '标准版',
        children: [ {
          thrMergeNumStart: 20,
          thrMergeNumEnd: 22,
          accountules: '根据租户开通的版本按月收费',
          children: [ {
            purSpec: '套',
            unitPrice: '7040.0',
          } ],
        } ],
      }, {
        secMergeNumStart: 21,
        secMergeNumEnd: 21,
        productName: '专业版',
        children: [ {
          thrMergeNumStart: 20,
          thrMergeNumEnd: 22,
          accountules: '根据租户开通的版本按月收费',
          children: [ {
            purSpec: '套',
            unitPrice: '17600.0',
          } ],
        } ],
      }, {
        secMergeNumStart: 22,
        secMergeNumEnd: 22,
        productName: '企业版',
        children: [ {
          thrMergeNumStart: 20,
          thrMergeNumEnd: 22,
          accountules: '根据租户开通的版本按月收费',
          children: [ {
            purSpec: '套',
            unitPrice: '46200.0',
          } ],
        } ],
      }, {
        secMergeNumStart: 23,
        secMergeNumEnd: 29,
        productName: '调度资源组套餐',
        children: [ {
          thrMergeNumStart: 23,
          thrMergeNumEnd: 36,
          accountules: '根据租户使用的调度任务数+数据集成任务数按月计费',
          children: [
            {
              purSpec: '500调度任务数',
              unitPrice: '1320.0',
            }, {
              purSpec: '1000调度任务数',
              unitPrice: '2200.0',
            }, {
              purSpec: '2000调度任务数',
              unitPrice: '3300.0',
            }, {
              purSpec: '5000调度任务数',
              unitPrice: '9900.0',
            }, {
              purSpec: '20000调度任务数',
              unitPrice: '35200.0',
            }, {
              purSpec: '50000调度任务数',
              unitPrice: '70400.0',
            }, {
              purSpec: '120000调度任务数',
              unitPrice: '165000.0',
            },
          ],
        } ],
      }, {
        secMergeNumStart: 30,
        secMergeNumEnd: 36,
        productName: ' 数据集成资源组套餐',
        children: [ {
          thrMergeNumStart: 23,
          thrMergeNumEnd: 36,
          accountules: '根据租户使用的调度任务数+数据集成任务数按月计费',
          children: [ {
            purSpec: '500集成任务数',
            unitPrice: '1320.0',
          }, {
            purSpec: '1000集成任务数',
            unitPrice: '2200.0',
          }, {
            purSpec: '2000集成任务数',
            unitPrice: '3300.0',
          }, {
            purSpec: '5000集成任务数',
            unitPrice: '9900.0',
          }, {
            purSpec: '20000集成任务数',
            unitPrice: '35200.0',
          }, {
            purSpec: '50000集成任务数',
            unitPrice: '70400.0',
          }, {
            purSpec: '120000集成任务数',
            unitPrice: '165000.0',
          } ],
        } ],
      }, {
        secMergeNumStart: 37,
        secMergeNumEnd: 37,
        productName: '数据保护套件',
        children: [ {
          thrMergeNumStart: 37,
          thrMergeNumEnd: 37,
          accountules: '根据开通的套数按月计费',
          children: [ {
            purSpec: '套',
            unitPrice: '8800.0',
          } ],
        } ],
      } ],
    },
  ],
  middleware: [ {
    productSub: '微服务',
    firMergeNumStart: 0,
    firMergeNumEnd: 1,
    children: [ {
      secMergeNumStart: 0,
      secMergeNumEnd: 0,
      productName: '企业级分布式应用服务（EDAS）',
      children: [ {
        thrMergeNumStart: 0,
        thrMergeNumEnd: 0,
        accountules: '根据每个应用部署的vCPU数按月计费',
        children: [ {
          purSpec: '20vCPU',
          unitPrice: '3300.0',
        } ],
      } ],
    }, {
      secMergeNumStart: 1,
      secMergeNumEnd: 1,
      productName: '云服务总线（CSB）',
      children: [ {
        thrMergeNumStart: 1,
        thrMergeNumEnd: 1,
        accountules: '根据实例个数按月计费',
        children: [ {
          purSpec: '逻辑实例',
          unitPrice: '4620.0',
        } ],
      } ],
    } ],
  }, {
    productSub: '应用监控',
    firMergeNumStart: 2,
    firMergeNumEnd: 7,
    children: [ {
      secMergeNumStart: 2,
      secMergeNumEnd: 7,
      productName: '应用实时监控服务（ARMS）',
      children: [ {
        thrMergeNumStart: 2,
        thrMergeNumEnd: 7,
        accountules: '根据租户应用监控资源包+前端页面监控资源包按月计费',
        children: [ {
          purSpec: '应用监控初级资源包：含150Agent',
          unitPrice: '23100.0',
        }, {
          purSpec: '应用监控中级资源包：含1200Agent',
          unitPrice: '138600.0',
        }, {
          purSpec: '应用监控高级资源包：含9600Agent',
          unitPrice: '831600.0',
        }, {
          purSpec: '前端监控初级资源包：含200万页面上报次数',
          unitPrice: '462.0',
        }, {
          purSpec: '前端监控中级资源包：含1600万页面上报次数',
          unitPrice: '2772.0',
        }, {
          purSpec: '前端监控高级资源包：含12800万页面上报次数',
          unitPrice: '16632.0',
        } ],
      } ],
    } ],
  }, {
    productSub: '消息中间件',
    firMergeNumStart: 8,
    firMergeNumEnd: 13,
    children: [ {
      secMergeNumStart: 8,
      secMergeNumEnd: 13,
      productName: '消息队列（MQ）',
      children: [ {
        thrMergeNumStart: 8,
        thrMergeNumEnd: 13,
        accountules: '根据实例Topic数量+消息发送TPS+消息订阅TPS按月计费',
        children: [ {
          purSpec: 'Topic基础包：50个',
          unitPrice: '2200.0',
        }, {
          purSpec: 'Topic扩展包：10个',
          unitPrice: '440.0',
        }, {
          purSpec: '消息发送基础包:1000TPS',
          unitPrice: '2679.0',
        }, {
          purSpec: '消息发送扩展包:500TPS',
          unitPrice: '1339.5',
        }, {
          purSpec: '消息订阅基础包:1000TPS',
          unitPrice: '2679.0',
        }, {
          purSpec: '消息订阅扩展包:500TPS',
          unitPrice: '1339.5',
        } ],
      } ],
    } ],
  } ],
  security: [
    {
      productSub: 'DDoS高防IP服务(互联网安全服务）',
      firMergeNumStart: 0,
      firMergeNumEnd: 2,
      children: [ {
        secMergeNumStart: 0,
        secMergeNumEnd: 2,
        productName: '新BGP高防IP服务',
        children: [ {
          thrMergeNumStart: 0,
          thrMergeNumEnd: 2,
          accountules: '按规格及数量计费，规格以外按每增加100M业务带宽按月计费',
          children: [ {
            purSpec: '规格1：防护能力30G；业务带宽100M',
            unitPrice: '32032.0',
          }, {
            purSpec: '规格2：防护能力60G；业务带宽100M',
            unitPrice: '72072.0',
          }, {
            purSpec: '每增加100M业务带宽',
            unitPrice: '15400.0',
          } ],
        } ],
      } ],
    }, {
      productSub: 'Web应用防火墙服务(互联网安全服务）',
      firMergeNumStart: 3,
      firMergeNumEnd: 5,
      children: [ {
        secMergeNumStart: 3,
        secMergeNumEnd: 5,
        productName: 'Web应用防火墙（WAF）',
        children: [ {
          thrMergeNumStart: 3,
          thrMergeNumEnd: 5,
          accountules: '按规格及数量计费，规格以外可按每增加一个域名补充包，或每增加100M业务带宽按月计费',
          children: [ {
            purSpec: '规格：支持10个域名防护（限1个主域名）；业务带宽30M；支持180天日志，3TB日志存储容量',
            unitPrice: '17402.0',
          }, {
            purSpec: '域名补充包（包含10个域名，限1个主域名）',
            unitPrice: '1540.0',
          }, {
            purSpec: '每增加100M业务带宽',
            unitPrice: '9240.0',
          } ],
        } ],
      } ],
    }, {
      productSub: '爬虫防护服务(互联网安全服务）',
      firMergeNumStart: 6,
      firMergeNumEnd: 8,
      children: [ {
        secMergeNumStart: 6,
        secMergeNumEnd: 8,
        productName: '爬虫风险管理(互联网安全服务）（Anti-Bot）',
        children: [ {
          thrMergeNumStart: 6,
          thrMergeNumEnd: 8,
          accountules: '按规格及数量计费，规格以外按每增加100QPS，或每增加100M业务带宽按月计费',
          children: [ {
            purSpec: '规格：支持10个域名防护（限1个一级域名）；支持100Mbps业务带宽；支持500QPS流量；',
            unitPrice: '24948.0',
          }, {
            purSpec: '每增加100QPS',
            unitPrice: '1232.0',
          }, {
            purSpec: '每增加100M业务带宽',
            unitPrice: '12320.0',
          } ],
        } ],
      } ],
    }, {
      productSub: '内容安全服务（互联网安全服务）',
      firMergeNumStart: 9,
      firMergeNumEnd: 13,
      children: [ {
        secMergeNumStart: 9,
        secMergeNumEnd: 13,
        productName: '内容安全服务（互联网安全服务）',
        children: [ {
          thrMergeNumStart: 9,
          thrMergeNumEnd: 13,
          accountules: '按基础规格计费，规格以外按扩展规格按月计费',
          children: [ {
            purSpec: '基础规格1：150万张（条）/月',
            unitPrice: '2926.0',
          }, {
            purSpec: '基础规格2：450万张（条）/月',
            unitPrice: '7700.0',
          }, {
            purSpec: '基础规格3：1500万张（条）/月',
            unitPrice: '21560.0',
          }, {
            purSpec: '扩展规格1：50万张（条）/月',
            unitPrice: '104.0',
          }, {
            purSpec: '扩展规格2：300万张（条）/月',
            unitPrice: '589.1',
          } ],
        } ],
      } ],
    }, {
      productSub: '网站涉黄恐暴政内容检测服务（互联网安全服务）',
      firMergeNumStart: 14,
      firMergeNumEnd: 14,
      children: [ {
        secMergeNumStart: 14,
        secMergeNumEnd: 14,
        productName: '网站涉黄恐暴政内容检测服务（互联网安全服务）',
        children: [ {
          thrMergeNumStart: 14,
          thrMergeNumEnd: 14,
          accountules: '根据检测的内容数量按月计费',
          children: [ {
            purSpec: '规格：单实例提供10万内容检测（包含url与图片总和）',
            unitPrice: '770.0',
          } ],
        } ],
      } ],
    }, {
      productSub: '网站威胁扫描服务(互联网安全服务）',
      firMergeNumStart: 15,
      firMergeNumEnd: 17,
      children: [ {
        secMergeNumStart: 15,
        secMergeNumEnd: 17,
        productName: '网站威胁扫描(互联网安全服务）',
        children: [ {
          thrMergeNumStart: 15,
          thrMergeNumEnd: 17,
          accountules: '按规格及数量计费，规格以外按每增加一个域名扩展包按月计费',
          children: [ {
            purSpec: '规格1：支持10个二级域名/IP；支持检测10万URL',
            unitPrice: '9240.0',
          }, {
            purSpec: '规格2：支持1个主域名，不限制二级域名/IP；支持检测50万URL',
            unitPrice: '32340.0',
          }, {
            purSpec: '域名扩展包(规格1扩展单位为每个二级域名/IP；规格2扩展单位为每个一级域名)',
            unitPrice: '7700.0',
          } ],
        } ],
      } ],
    },
    {
      productSub: '渗透测试服务（安全专家服务）',
      firMergeNumStart: 18,
      firMergeNumEnd: 19,
      children: [ {
        secMergeNumStart: 18,
        secMergeNumEnd: 19,
        productName: '渗透测试服务（安全专家服务）',
        children: [ {
          thrMergeNumStart: 18,
          thrMergeNumEnd: 19,
          accountules: '按人天计费',
          children: [ {
            purSpec: '规格：标准版 5人天，超出按人天计费',
            unitPrice: '110000.0',
          }, {
            purSpec: '规格：高级版 5人天，超出按人天计费',
            unitPrice: '165000.0',
          } ],
        } ],
      } ],
    }, {
      productSub: '安全评估服务（安全专家服务）',
      firMergeNumStart: 20,
      firMergeNumEnd: 21,
      children: [ {
        secMergeNumStart: 20,
        secMergeNumEnd: 21,
        productName: '安全评估服务（安全专家服务）',
        children: [ {
          thrMergeNumStart: 20,
          thrMergeNumEnd: 21,
          accountules: '按次计费',
          children: [ {
            purSpec: '规格：提供1个域名1次安全评估及1次复测',
            unitPrice: '33000.0',
          }, {
            purSpec: '规格：提供1个域名1次现场安全评估及1次复测',
            unitPrice: '55000.0',
          } ],
        } ],
      } ],
    }, {
      productSub: '应急响应服务（安全专家服务）',
      firMergeNumStart: 22,
      firMergeNumEnd: 23,
      children: [ {
        secMergeNumStart: 22,
        secMergeNumEnd: 23,
        productName: '应急响应服务（安全专家服务）',
        children: [ {
          thrMergeNumStart: 22,
          thrMergeNumEnd: 23,
          accountules: '按次计费',
          children: [ {
            purSpec: '规格：按1个系统1次远程服务',
            unitPrice: '11000.0',
          }, {
            purSpec: '规格：按1个系统1次现场服务',
            unitPrice: '22000.0',
          } ],
        } ],
      } ],
    }, {
      productSub: '安全护航服务（安全专家服务）',
      firMergeNumStart: 24,
      firMergeNumEnd: 27,
      children: [ {
        secMergeNumStart: 24,
        secMergeNumEnd: 27,
        productName: '安全护航服务（安全专家服务）',
        children: [ {
          thrMergeNumStart: 24,
          thrMergeNumEnd: 27,
          accountules: '按人天计费',
          children: [ {
            purSpec: '远程服务：5人天7*8小时',
            unitPrice: '55000.0',
          }, {
            purSpec: '远程服务：5人天7*24小时',
            unitPrice: '110000.0',
          }, {
            purSpec: '现场服务：5人天7*8小时',
            unitPrice: '66000.0',
          }, {
            purSpec: '现场服务：5人天7*24小时',
            unitPrice: '132000.0',
          } ],
        } ],
      } ],
    }, {
      productSub: '安全咨询（安全专家服务）',
      firMergeNumStart: 28,
      firMergeNumEnd: 28,
      children: [ {
        secMergeNumStart: 28,
        secMergeNumEnd: 28,
        productName: '安全咨询（安全专家服务）',
        children: [ {
          thrMergeNumStart: 28,
          thrMergeNumEnd: 28,
          accountules: '按人天计费',
          children: [ {
            purSpec: '规格：人天',
            unitPrice: '11000.0',
          } ],
        } ],
      } ],
    }, {
      productSub: '态势感知服务',
      firMergeNumStart: 29,
      firMergeNumEnd: 29,
      children: [ {
        secMergeNumStart: 29,
        secMergeNumEnd: 29,
        productName: '态势感知',
        children: [ {
          thrMergeNumStart: 29,
          thrMergeNumEnd: 29,
          accountules: '根据受保护的虚拟机个数按月计费',
          children: [ {
            purSpec: '规格：1个虚拟机实例',
            unitPrice: '66.0',
          } ],
        } ],
      } ],
    }, {
      productSub: 'DDoS流量清洗服务',
      firMergeNumStart: 30,
      firMergeNumEnd: 30,
      children: [ {
        secMergeNumStart: 30,
        secMergeNumEnd: 30,
        productName: 'DDoS防护（Anti-DDoS）',
        children: [ {
          thrMergeNumStart: 30,
          thrMergeNumEnd: 30,
          accountules: '根据流量按月计费',
          children: [ {
            purSpec: '规格：共享20G ',
            unitPrice: '7370.0',
          } ],
        } ],
      } ],
    }, {
      productSub: '云防火墙服务',
      firMergeNumStart: 31,
      firMergeNumEnd: 31,
      children: [ {
        secMergeNumStart: 31,
        secMergeNumEnd: 31,
        productName: '云防火墙',
        children: [ {
          thrMergeNumStart: 31,
          thrMergeNumEnd: 31,
          accountules: '根据受保护的虚拟机个数按月计费',
          children: [ {
            purSpec: '规格：1个虚拟机实例',
            unitPrice: '1265.0',
          } ],
        } ],
      } ],
    }, {
      productSub: '主机安全服务',
      firMergeNumStart: 32,
      firMergeNumEnd: 32,
      children: [ {
        secMergeNumStart: 32,
        secMergeNumEnd: 32,
        productName: '安骑士',
        children: [ {
          thrMergeNumStart: 32,
          thrMergeNumEnd: 32,
          accountules: '根据受保护的虚拟机个数按月计费',
          children: [ {
            purSpec: '规格：1个虚拟机实例',
            unitPrice: '80.3',
          } ],
        } ],
      } ],
    }, {
      productSub: '堡垒机服务',
      firMergeNumStart: 33,
      firMergeNumEnd: 35,
      children: [ {
        secMergeNumStart: 33,
        secMergeNumEnd: 35,
        productName: '堡垒机',
        children: [ {
          thrMergeNumStart: 33,
          thrMergeNumEnd: 35,
          accountules: '根据实例规格和个数按月计费',
          children: [ {
            purSpec: '规格：单实例200资产，200并发',
            unitPrice: '5412.0',
          }, {
            purSpec: '规格：单实例500资产，500并发',
            unitPrice: '12447.6',
          }, {
            purSpec: '规格：单实例1000资产，1000并发',
            unitPrice: '21648.0',
          } ],
        } ],
      } ],
    }, {
      productSub: 'Web应用防火墙服务',
      firMergeNumStart: 36,
      firMergeNumEnd: 36,
      children: [ {
        secMergeNumStart: 36,
        secMergeNumEnd: 36,
        productName: 'Web应用防火墙-企业版',
        children: [ {
          thrMergeNumStart: 36,
          thrMergeNumEnd: 36,
          accountules: '根据SLB个数按月计费',
          children: [ {
            purSpec: '规格：1个SLB',
            unitPrice: '2200.0',
          } ],
        } ],
      } ],
    }, {
      productSub: '数据库审计服务',
      firMergeNumStart: 37,
      firMergeNumEnd: 37,
      children: [ {
        secMergeNumStart: 37,
        secMergeNumEnd: 37,
        productName: '数据库审计',
        children: [ {
          thrMergeNumStart: 37,
          thrMergeNumEnd: 37,
          accountules: '根据数据库实例个数按月计费',
          children: [ {
            purSpec: '规格：20个数据库实例',
            unitPrice: '22000.0',
          } ],
        } ],
      } ],
    }, {
      productSub: '数据加密服务',
      firMergeNumStart: 38,
      firMergeNumEnd: 38,
      children: [ {
        secMergeNumStart: 38,
        secMergeNumEnd: 38,
        productName: '数据加密服务',
        children: [ {
          thrMergeNumStart: 38,
          thrMergeNumEnd: 38,
          accountules: '根据数据库实例个数按月计费',
          children: [ {
            purSpec: '规格：1个实例',
            unitPrice: '3300.0',
          } ],
        } ],
      } ],
    }, {
      productSub: '数据脱敏服务',
      firMergeNumStart: 39,
      firMergeNumEnd: 39,
      children: [ {
        secMergeNumStart: 39,
        secMergeNumEnd: 39,
        productName: '数据发现与脱敏',
        children: [ {
          thrMergeNumStart: 39,
          thrMergeNumEnd: 39,
          accountules: '根据数据库实例个数按月计费',
          children: [ {
            purSpec: '规格：20个数据库实例',
            unitPrice: '22000.0',
          } ],
        } ],
      } ],
    },
  ],
}

class PolContract extends React.Component {
  getCol = (value, index, startNum, endNum) => {
    const obj = {
      children: <Tooltip title={value} placement="topLeft">{value}</Tooltip>,
      props: {},
    }
    if (startNum === endNum) {
      return obj
    }
    if (startNum < index || endNum >= index) {
      obj.props.rowSpan = 0
      obj.props.rowSpan = 0
    }
    if (startNum === index) {
      obj.props.rowSpan = endNum - startNum + 1
    }
    return obj
  }

  getChildData = (items, newItems, newList) => {
    if (items.children) {
      items.children.map((itemsChi, index) => {
        delete newItems.children
        const newItemChi = {
          ...newItems,
          ...itemsChi,
          key: index,
        }
        this.getChildData(newItemChi, newItemChi, newList)
      })
    } else {
      delete newItems.children
      newList.push(newItems)
    }
    return newList
  }

  getData = (list) => {
    let newList = []
    list.map((item) => {
      newList = this.getChildData(item, item, newList)
    })
    return newList
  }

  renderTable = (source) => {
    const dataSource = this.getData(source)
    const columns = [ {
      title: '产品子类',
      dataIndex: 'productSub',
      render: (value, row, index) => this.getCol(value, index, row.firMergeNumStart, row.firMergeNumEnd),
    },
    {
      title: '产品名称',
      dataIndex: 'productName',
      render: (value, row, index) => this.getCol(value, index, row.secMergeNumStart, row.secMergeNumEnd),
    },
    {
      title: '计费规则',
      dataIndex: 'accountules',
      render: (value, row, index) => this.getCol(value, index, row.thrMergeNumStart, row.thrMergeNumEnd),
    },
    {
      title: '采购规格（单位）',
      width: 300,
      dataIndex: 'purSpec',
      render: (_) => {
        if (_.length <= 10) {
          return _
        }
        return <Tooltip title={_} placement="topLeft">{_}</Tooltip>
      },
    },
    {
      title: '单价（元/月）',
      dataIndex: 'unitPrice',
    },
    ]
    return (
      <>
        <Table
          className={styles.polTable}
          columns={columns}
          dataSource={dataSource}
          bordered
          rowKey={(record, index) => index}
          pagination={false}
        />
        <div style={{ marginTop: 20 }}>
          当月1日至15日（ 含） 开通的云资源当月免费测试， 次月开始计费； 当月15日至次月1日前开通的云资源当月和次月均免费测试； 云资源释放或变更当月按全月计费（ 注： DTS不受本条款约束， 开通即按月计费）。
        </div>
      </>
    )
  }

  render () {
    const tabList = [ {
      name: '计算服务',
      key: 'computing',
    }, {
      name: '存储服务',
      key: 'storage',
    }, {
      name: '网络服务',
      key: 'network',
    }, {
      name: '数据库服务',
      key: 'database',
    }, {
      name: '大数据服务',
      key: 'bigdata',
    }, {
      name: '中间件服务',
      key: 'middleware',
    }, {
      name: '安全服务',
      key: 'security',
    } ]
    tabList.map((item) => {
      item.children = this.renderTable(data[item.key])
    })
    return (
      <TabsIndex
        title="云服务目录-政务"
        tabList={tabList}
      />
    )
  }
}

PolContract.propTypes = {}
export default PolContract
