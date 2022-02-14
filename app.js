function getRandomValue(min, max) {
	return Math.floor(Math.random() * (max - min) + min);
}

const app = Vue.createApp({
	data() {
		return {
			playerHealth: 100,
			monsterHealth: 100,
			currentTurn: 0,
			victory: null,
			heals: 10,
			battleLog: [],
		};
	},
	computed: {
		monsterHealthBar() {
			if (this.monsterHealth < 0) return { width: "0%" };
			return { width: this.monsterHealth + "%" };
		},
		playerHealthBar() {
			if (this.playerHealth < 0) return { width: "0%" };
			return { width: this.playerHealth + "%" };
		},
		specialAttackAvailable() {
			return this.currentTurn % 3 !== 0;
		},
		healsAvailable() {
			return this.heals === 0;
		},
	},
	watch: {
		playerHealth(value) {
			if (value <= 0 && this.monsterHealth <= 0) this.victory = "draw";
			else if (value <= 0) this.victory = "monster";
		},
		monsterHealth(value) {
			if (value <= 0 && this.playerHealth <= 0) this.victory = "draw";
			else if (value <= 0) this.victory = "player";
		},
	},
	methods: {
		startGame() {
			this.playerHealth = 100;
			this.monsterHealth = 100;
			this.currentTurn = 0;
			this.victory = null;
			this.heals = 10;
			this.battleLog = [];
		},
		attackMonster() {
			this.currentTurn++;
			const attackValue = getRandomValue(5, 12);
			this.monsterHealth -= attackValue;
			this.addBattlelog("player", "attack", attackValue);
			this.attackPlayer();
		},
		attackPlayer() {
			const attackValue = getRandomValue(9, 18);
			this.playerHealth -= attackValue;
			this.addBattlelog("monster", "attack", attackValue);
		},
		specialAttackMonster() {
			this.currentTurn++;
			const attackValue = getRandomValue(10, 25);
			this.monsterHealth -= attackValue;
			this.addBattlelog("player", "attack", attackValue);
			this.attackPlayer();
		},
		healPlayer() {
			this.currentTurn++;
			this.heals--;
			const healValue = getRandomValue(8, 20);
			if (this.playerHealth + healValue > 100) this.playerHealth = 100;
			else if ((this.playerHealth += healValue));
			else if (heals <= 0) return null;
			this.addBattlelog("player", "heal", healValue);
			this.attackPlayer();
		},
		surrender() {
			this.victory = "monster";
		},
		addBattlelog(who, what, value) {
			this.battleLog.unshift({
				actionBy: who,
				actionType: what,
				actionValue: value,
			});
		},
	},
});

app.mount("#game");
