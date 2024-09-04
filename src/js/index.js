const { createApp } = Vue;
const app = createApp({
  data() {
    return {
      heroList: [],
      query: {
        key: 'dingwei',
        value: 0,
      },
      checked: 0,
      keywords: '',
      typeList: {
        zonghe: [
          { name: '本周免费', value: 10 },
          { name: '新手推荐', value: 11 },
        ],
        dingwei: [
          { name: '全部', value: 0 },
          { name: '坦克', value: 3 },
          { name: '战士', value: 1 },
          { name: '法师', value: 2 },
          { name: '刺客', value: 4 },
          { name: '射手', value: 5 },
          { name: '辅助', value: 6 },
        ],
      },
    };
  },
  methods: {
    changeType(key, value) {
      this.query.key = key;
      this.query.value = value;
      this.checked = value;
      this.keywords = '';
    },
    changeKeyword(event) {
      this.keywords = event.target.value;
      this.query.value = 0;
      this.checked = 0;
    },
  },
  computed: {
    heroDetail() {
      return value => {
        return `https://pvp.qq.com/web201605/herodetail/${value}.shtml`;
      };
    },
    heroImage() {
      return value => {
        return `https://game.gtimg.cn/images/yxzj/img201606/heroimg/${value}/${value}.jpg`;
      };
    },
    filterHeroes() {
      let { key, value } = this.query;
      let keywords = this.keywords;
      if (keywords === '') {
        if (key === 'zonghe') {
          //根据pay_type的值进行过滤
          return this.heroList.filter(item => item.pay_type === value);
        } else if (key === 'dingwei') {
          if (value === 0) {
            return this.heroList;
          } else {
            return this.heroList.filter(item => item.hero_type === value || item.hero_type2 === value);
          }
        }
      } else {
        const res = this.heroList.filter(item => item.cname.includes(keywords));
        //不能直接对原始数据进行修改，需要将res深拷贝一份
        const newArr = _.cloneDeep(res);
        return newArr.map(item => {
          item.cname = item.cname.replace(keywords, `<span style="color: red">${keywords}</span>`);
          return item;
        });
      }
    },
  },

  mounted() {
    // console.log('当前组件完成挂载初始化');
    axios.get('http://project.x-zd.net:3001/apis/herolist').then(res => {
      this.heroList = res.data.data.reverse();
    });
  },
});
app.mount('#app');
