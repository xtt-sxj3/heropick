const { createApp } = Vue;
const app = createApp({
  data() {
    return {
      heroList: [],
    };
  },
  methods: {},
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
  },

  mounted() {
    // console.log('当前组件完成挂载初始化');
    axios.get('http://project.x-zd.net:3001/apis/herolist').then(res => {
      this.heroList = res.data.data.reverse();
    });
  },
});
app.mount('#app');
