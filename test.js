//https://imasters.com.br/front-end/trabalhando-com-datas-em-javascript-com-momentjs
// https://momentjs.com/docs/#/get-set/day/

import moment from "moment";

const api_date = moment('2023/05/05', "YYYY-MM-DD", "pt", true);
console.log(api_date.get('day'));
