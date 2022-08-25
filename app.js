function getRandVal(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

const game = Vue.createApp({
  data() {
    return {
      monsterHealth: 100,
      playerHealth: 100,
    };
  },
  computed: {
    monsterHealthBar() {
      return { width: this.monsterHealth + "%" };
    },
    playerHealthBar() {
      return { width: this.playerHealth + "%" };
    },
  },
  methods: {
    attackMonster() {
      const attackDamage = getRandVal(5, 12);
      this.monsterHealth -= attackDamage;
      this.attackPlayer();
    },
    attackPlayer() {
      const attackDamage = getRandVal(8, 15);
      this.playerHealth -= attackDamage;
    },
    specialAttack() {
      const attackDamage = getRandVal(10, 25);
      this.monsterHealth -= attackDamage;
      this.attackPlayer();
    },
  },
});
game.mount("#game");
