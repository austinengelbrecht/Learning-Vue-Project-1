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
  watch: {
    playerHealth(value) {
      if (value <= 0 && this.monsterHealth <= 0) {
        // Draw
      } else if (value <= 0) {
        //Player Lost
      }
    },
    monsterHealth(value) {
      if (value <= 0 && this.playerHealth <= 0) {
        //Draw
      } else if (value <= 0) {
        //Monster lost
      }
    },
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
    healPlayer() {
      this.currentRound++;
      const healAmt = getRandVal(5, 20);
      if (this.playerHealth + healAmt > 100) {
        this.playerHealth = 100;
      } else {
        this.playerHealth += healAmt;
      }
      this.attackPlayer();
    },
  },
});
game.mount("#game");
