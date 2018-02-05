export default (reportParams = {}) => {
  console.log('sending', reportParams)
  if (!reportParams) return
  // 透传到接口
  // console.log('fetch', fetch)
  try {
    sendReportByAjax(reportParams)
  } catch (error) {
    sendReportByAjax(error)
  }
}


//通过post方式上报性能或错误信息
export function sendReportByAjax(argObj, url = config.viewUrl) {
  const xmlhttp = new XMLHttpRequest()
  // console.log('go into send report by ajax..')
  //针对FireFox、Mozillar、Opera、Safari、IE7、IE8
  //修正某些mozillar浏览器的BUG
  if (window.XMLHttpRequest && xmlhttp.overrideMimeType) {
    xmlhttp.overrideMimeType('text/html')
  }
  if (xmlhttp != null) {
    xmlhttp.onreadystatechange = (res) => {
      // if (argObj.logtype == 10000) return // 页面上报回调不做任何事情
      console.log('reported', argObj, res)
      return
      if (xmlhttp.status == 200 && xmlhttp.readyState == 4) {
        成功
        let filteredReports
        const storedReports = JSON.parse(cookie.get('temp_reports')) || []
        // console.log('刚才的点击上报成功了!! 目前的缓存是..', storedReports)
        filteredReports = storedReports.filter((report) => {
          // console.log('report.fronttime', report.fronttime)
          // console.log('argObj.fronttime', argObj.fronttime)
          if (report.fronttime == argObj.fronttime) {
            // console.log('找到了这条缓存里的上报, 把它消除', report.fronttime)
            return false
          }
          return true
        }) // 设置新的reports缓存
        // console.log('被过滤后的缓存是', filteredReports)
        filteredReports && cookie.set('temp_reports', JSON.stringify(filteredReports), { domain: 'cekid.com' })
      }
    }
    xmlhttp.open('post', url, true)
    xmlhttp.send(JSON.stringify(Array.isArray(argObj) ? argObj : Array.of(argObj)))
  }
}

// 取当前时间
export function getTimestamp() {
  return (new Date()).getTime()
}

export function getReportDomain() {
  return 'cekid.com'
}

export const config = { // 转移tracker
	viewUrl: 'https://track.' + getReportDomain() + '/newflow',
	performanceErrorUrl: 'https://track.' + getReportDomain() + '/fronterror',
	combo: 1, //是否合并上报，0关闭
	level: 4, // 1-debug 2-info 4-error 8-fail
	ignore: [/Script error/i], //忽略跨域错误静态文件请求错误
	random: 1, //抽样上报
	delay: 1000, //combo=1时延迟合并缓冲区上报
	submit: null,
	eventState: true //是否开启点击/跳转事件上报
}