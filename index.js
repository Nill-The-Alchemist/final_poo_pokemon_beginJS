import { prompt } from "./prompt.js";

//INITIALIZATION CLASS POKEMON
class Pokemon {
  constructor(name, emoji, health, attacks = []) {
    this.name = name;
    this.emoji = emoji;
    this.attacks = [...attacks];
    this.health = health;
  }

  randomAttack() {
    this.random = Math.floor(Math.random() * this.attacks.length || 0);
    this.randomChoice = this.attacks[this.random];
    return this.randomChoice;
  }

  logAttack() {
    return this.attacks.forEach((attack, index) => {
      console.log(`${index + 1}. ${attack.name}`);
    });
  }

  logPokemon() {
    console.log(this.name, this.health);
    this.logAttack();
  }

  getHealth() {
    let healthBar = "";
    let saveHealth = this.health;

    for (let i = 0; i < 10; i++) {
      if (saveHealth > 0) {
        healthBar += "🟩";
      } else {
        healthBar += "🟥";
      }
      saveHealth -= 10;
    }
    saveHealth;
    return `${healthBar}`;
  }
}

//INITIALIZATION CLASS ATTACK
class Attack {
  constructor(name, power, stability) {
    this.name = name;
    this.power = power;
    this.stability = stability;
  }

  performAttack() {
    this.damage = Math.floor(Math.random() * this.power * 1.5) * this.stability;
    return Number(this.damage.toFixed(1));
  }

  logAttack() {
    return console.log(
      `${this.name} - Power : ${this.power}, Stability 💥 : ${this.stability}`
    );
  }
}

const pikachu = new Pokemon("Pikachu", "⚡️", 100, [
  new Attack("Thunderbolt", 30, 0.2),
  new Attack("Electro Ball", 20, 0.4),
  new Attack("Quick Attack", 10, 0.8),
]);

const bulbasaur = new Pokemon("Bulbasaur", "🍃", 95, [
  new Attack("Vine Whip", 25, 0.3),
  new Attack("Seed Bomb", 20, 0.5),
  new Attack("Tackle", 10, 0.8),
]);

const charmander = new Pokemon("Charmander", "🔥", 90, [
  new Attack("Flamethrower", 35, 0.9),
  new Attack("Ember", 25, 0.9),
  new Attack("Scratch", 15, 0.9),
]);

//INITIALIZATION CLASS GAME
class Game {
  constructor() {
    this.pokemons = {
      1: pikachu,
      2: bulbasaur,
      3: charmander,
    };
  }

  //USER CHOOSE POKEMON
  userChoose() {
    let choosePokemon;
    choosePokemon = Number(
      prompt(
        `\n\nChosse your pokemon:\n1.${this.pokemons[1].name} ${this.pokemons[1].emoji}\n2.${this.pokemons[2].name} ${this.pokemons[2].emoji}\n3.${this.pokemons[3].name} ${this.pokemons[3].emoji}\n`
      )
    );
    if (![1, 2, 3].includes(choosePokemon)) {
      console.log("\nVeuillez choisir un Pokémon entre 1 et 3 !\n");
      return this.userChoose();
    }
    this.selectPokemonUser = this.pokemons[choosePokemon];
    return this.selectPokemonUser;
  }

  //RANDOM CHOOSE POKEMON
  machineChooseFn() {
    let randomChoose;
    do {
      randomChoose =
        Math.floor(Math.random() * Object.values(this.pokemons).length) + 1;
    } while (this.pokemons[randomChoose] === this.selectPokemonUser);

    this.machineChooses = this.pokemons[randomChoose];
    return this.machineChooses;
  }

  //INITIALIZATION START LOG
  battleStart() {
    console.log(
      `\n\nBattle:\n\n${this.selectPokemonUser.getHealth()}\n${
        this.selectPokemonUser.name + " " + this.selectPokemonUser.emoji
      }\n\n ⚡️VS ⚡️\n\n${this.machineChooses.getHealth()}\n${
        this.machineChooses.name + " " + this.machineChooses.emoji
      }\n\n`
    );
  }

  //THE BATTLE GAME
  battleGame() {
    this.selectPokemonUser.attacks.forEach((attack, index) => {
      `${index + 1}.${attack.logAttack()}`;
    });

    if (this.selectPokemonUser.health > 0 && this.machineChooses.health > 0) {
      let chooseAttack = Number(prompt(`Choose your attack: `));

      if (
        chooseAttack < 1 ||
        chooseAttack > this.selectPokemonUser.attacks.length
      ) {
        console.log("Invalid Choose ! Retry !");
        return this.battleGame();
      }

      let randomChoose =
        Math.floor(Math.random() * this.machineChooses.attacks.length) + 1;

      this.selectedAttack = this.selectPokemonUser.attacks[chooseAttack - 1];
      this.selectedRandomAttack = this.machineChooses.attacks[randomChoose - 1];

      let damagesUser = this.selectedAttack.performAttack();
      let damagesMachine = this.selectedRandomAttack.performAttack();

      this.machineChooses.health -= damagesUser;
      this.selectPokemonUser.health -= damagesMachine;

      console.log(
        `💥${this.selectPokemonUser.name} use ${this.selectedAttack.name} made ${damagesUser} damages and ${this.machineChooses.name} use to made ${this.selectedRandomAttack.name} ${damagesMachine} damages.`
      );
      this.timeOut();
      setTimeout(() => this.battleStart(), 5000);
      setTimeout(() => this.battleGame(), 5000);
    } else {
      const defeatedPokemon =
        this.selectPokemonUser.health <= 0
          ? this.selectPokemonUser
          : this.machineChooses;

      const winnerPokemon =
        this.selectPokemonUser.health > 0
          ? this.selectPokemonUser
          : this.machineChooses;

      console.log(
        `${defeatedPokemon.name} is out of health and lost the battle! ${winnerPokemon.name} wins the battle!`
      );

      this.battleStart();
      console.log(
        `${defeatedPokemon.name} is out of health ❌ and lost the battle ! ${winnerPokemon.name} wins the battle ! 🏆`
      );
    }
  }

  //setTimeout FOR battleGame()
  timeOut() {
    const messages = [
      { text: `...5\n`, delay: 5000 },
      { text: "...4", delay: 4000 },
      { text: "...3", delay: 3000 },
      { text: "...2", delay: 2000 },
      { text: "...1", delay: 1000 },
    ];

    messages.forEach(({ text, delay }) => {
      setTimeout(() => console.log(text), delay);
    });
  }
}

//GAME START
const play = () => {
  const gaming = new Game();

  gaming.userChoose();
  gaming.machineChooseFn();

  setTimeout(() => {
    gaming.battleStart();
  }, 500);

  setTimeout(() => {
    gaming.battleGame();
  }, 500);
};

play();
