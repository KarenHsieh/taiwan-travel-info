const axios = require("axios");
const {axiosCall} = require("../tools")

const apiBaseUri = "https://ptx.transportdata.tw/MOTC/v2/";
const uri = {
  scenicSpot: `${apiBaseUri}Tourism/ScenicSpot`,
  restaurant: `${apiBaseUri}Tourism/Restaurant`,
  hotel: `${apiBaseUri}Tourism/Hotel`,
  activity: `${apiBaseUri}Tourism/Activity`,
};

exports.getList = async (ctx, next) => {
  ctx.status = 200;
  // const { compNo, no, startDate, endDate, orderNo, method, status } = ctx.request.body
  const options = {
    method: "POST",
    url: "",
    data: {},
  };
  try {
    const { data } = await axios({
      method: "GET",
      url: options.url,
      timeout: options.timeout || 30 * 1000,
      headers: options.headers || {
        "X-Requested-With": "XMLHttpRequest",
        "content-type": "application/json;charset=UTF-8",
      },
    })
      .then((response) => {
        // return checkStatus(response)
      })
      .then((res) => {
        // return checkCode(res)
      });
  } catch (error) {
    console.error(`network fetch error - ${options.url} - ${error.message}`);
  }
};
