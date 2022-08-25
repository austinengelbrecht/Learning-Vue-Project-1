function getRandVal(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

const game = Vue.createApp({
  data() {
    return {
      monsterHealth: 100,
      playerHealth: 100,
      currentRound: 0,
      winner: null,
      battleLog: [],
    };
  },
  watch: {
    playerHealth(value) {
      if (value <= 0 && this.monsterHealth <= 0) {
        // Draw
        this.winner = "draw";
      } else if (value <= 0) {
        //Player Lost
        this.winner = "monster";
      }
    },
    monsterHealth(value) {
      if (value <= 0 && this.playerHealth <= 0) {
        //Draw
        this.winner = "draw";
      } else if (value <= 0) {
        //Monster lost
        this.winner = "player";
      }
    },
  },
  computed: {
    monsterHealthBar() {
      if (this.monsterHealth < 0) {
        return { width: "0%" };
      }
      return { width: this.monsterHealth + "%" };
    },
    playerHealthBar() {
      if (this.playerHealth < 0) {
        return { width: "0%" };
      }
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
      this.addLogMessage("player", "attack", attackDamage);
      this.attackPlayer();
    },
    attackPlayer() {
      const attackDamage = getRandVal(8, 15);
      this.playerHealth -= attackDamage;
      this.addLogMessage("monster", "attack", attackDamage);
    },
    specialAttack() {
      this.currentRound++;
      const attackDamage = getRandVal(10, 25);
      this.monsterHealth -= attackDamage;
      this.addLogMessage("player", "Spl Attack", attackDamage);
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
      this.addLogMessage("player", "heals", healAmt);
      this.attackPlayer();
    },
    newGame() {
      this.monsterHealth = 100;
      this.playerHealth = 100;
      this.currentRound = 0;
      this.winner = null;
    },
    surrender() {
      this.winner = "monster";
    },
    addLogMessage(who, what, value) {
      this.battleLog.unshift({
        action: who,
        actionType: what,
        actionValue: value,
      });
    },
  },
});
game.mount("#game");
