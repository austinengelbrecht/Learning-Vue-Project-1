const game = Vue.createApp({
  data() {
    return {
      monsterHealth: 100,
      playerHealth: 100,
    };
  },
  methods: {
    attackMonster() {
      const attackDamage = Math.floor(Math.random() * (12 - 5)) + 5;
    },
  },
});
game.mount("#game");
