function getRandVal(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

const game = Vue.createApp({
  data() {
    return {
      monsterHealth: 100,
      playerHealth: 100,
      currentRound: 0,
    };
  },
  computed: {
    monsterHealthBar() {
      return { width: this.monsterHealth + "%" };
    },
    playerHealthBar() {
      return { width: this.playerHealth + "%" };
    },
    specialAttackAvail() {
      return this.currentRound % 3 !== 0;
    },
  },
  methods: {
    attackMonster() {
      this.currentRound++;
      const attackDamage = getRandVal(5, 12);
      this.monsterHealth -= attackDamage;
      this.attackPlayer();
    },
    attackPlayer() {
      const attackDamage = getRandVal(8, 15);
      this.playerHealth -= attackDamage;
    },
    specialAttack() {
      this.currentRound++;
      const attackDamage = getRandVal(10, 25);
      this.monsterHealth -= attackDamage;
      this.attackPlayer();
    },
  },
});
game.mount("#game");
