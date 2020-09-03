import ip from 'ip'
import ipAddress from 'ip-address'

export default function(cidrIp){

    const ip1v4 = new ipAddress.Address4(cidrIp);
    if (ip1v4.valid) {
        const subnet = ip.cidrSubnet(cidrIp);
        const {firstAddress, lastAddress} = subnet;
        return  ip.toLong(lastAddress) - ip.toLong(firstAddress)
      }
      return 0
}
