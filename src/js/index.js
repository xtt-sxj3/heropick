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
    };
  },
  methods: {
    changeType(key, value) {
      this.query.key = key;
      this.query.value = value;
      this.checked = value;
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
