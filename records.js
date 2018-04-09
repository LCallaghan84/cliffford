module.exports = class Records{
  checkCriminal(info, name){
    try{
      let msg = '__**Criminal record of ' + name + '**__\n';
      msg += '*' + info.extra.crew +'*\n';
      msg += '\n';
      msg += '**Capital offenses**\n';
      msg += 'Cops killed: ' +info.crimes['Cops killed'] + '\n';
      msg += 'NOOSE killed: ' +info.crimes['NOOSE killed'] + '\n';
      msg += 'Kills: ' +info.combat['Kills'] + ' (' + info.combat['Headshot kills'] + ' headshots)\n';
      msg += 'Player kills: ' +info.combat['Player kills'] + ' (' + info.combat['Player headshot kills'] + ' headshots)\n';
      msg += 'Overall accuracy: ' +info.combat['Accuracy'] + '\n';
      msg += 'Kill Death Ratio: ' + info.career['Player vs Player Kill / Death ratio'] + '\n';
      msg += 'Store hold ups: ' +info.crimes['Store Hold Ups'] + '\n';
      msg += 'Cars stolen: ' +info.crimes['Cars stolen'] + '\n';
      msg += (this.parseToInt(info.general['Sex acts purchased']) > 0)?(info.general['Sex acts purchased'] + ' counts of sollicitation\n'):'';
      msg += '\n';
      msg += '**Other**\n';
      msg += (this.parseToInt(info.general['Private dances']) > 100)?'Pervert\n':'';
      msg += 'Top speeding-ticket: ' +info.vehicles['Highest speed in a road vehicle'] + ' (' + info.vehicles['Road vehicle driven fastest'] + ')\n';
      msg += 'Farthest wheelie: ' +info.vehicles['Farthest wheelie'] + '\n';
      msg += 'Farthest stoppie: ' +info.vehicles['Farthest stoppie'] + '\n';
      msg += 'Hit & run\'s: ' +info.crimes['Store Hold Ups'] + '\n';
      msg += 'Time wanted: ' +info.crimes['Time spent with a Wanted Level'] + '\n';
      msg += '\n';
      msg += '**Psychological report**\n'
      msg += (this.parseToInt(info.general['Photos taken']) > 150)?'Sociopath\n':'';
      msg += (this.parseToInt(info.combat['Player kills']) > 2000)?'Psychopath\n':'';
      msg += (this.parseToInt(info.general['Private dances']) > 25)?'Pervert\n':'';
      msg += (this.parseToInt(info.general['Player vs Player Kill / Death ratio']) < 1)?'Pussy\n':'';
      msg += (this.parseToInt(info.general['Deaths by drowning']) > 30)?'Can\'t swim\n':'';
      msg += (this.parseToInt(info.general['Deaths by falling']) > 200)?'Clumsy\n':'';
      msg += 'Weapon of choice: '+ this.getFavWeapon(info.weapons);
      msg += '\n\n';
      msg += '**WANTED DEAD OR ALIVE:**\n';
      msg += '$' + (this.parseToInt(info.general['Bounties placed on you'])*4000);
      return msg;
    } catch(e){
      console.log('Failed to create criminal record, error: ' + e);
      return false;
    }
  }

  checkFinancial(info, name){
    try{
      let msg = '__**Financial report of ' + name + '**__\n';
      msg += '*' + info.extra.crew +'*\n';
      msg += '\n';
      msg += 'Level: ' + info.extra.level + '\n';
      msg += 'Cash: ' + info.extra.cash + '\n';
      msg += 'Bank: ' + info.extra.bank + '\n';
      msg += 'Income: ' + info.career['Overall income'] +'\n';
      msg += 'Expenses: '+info.career['Overall expenses']+'\n';
      msg += 'Cash picked up: ' + info.cash['Picked up'] + '\n';
      msg += 'Job earnings: ' + info.cash['Earned from Jobs']+'\n';
      msg += 'Time played: '+ info.career['Time spent in GTA Online']+'\n';
      msg += '\n';
      msg += (info.cash['Picked up'].substr(info.cash['Picked up'].length-1) == 'M' && info.cash['Picked up'].length > 5)?'Conclusion: Fraud\n': 'Conclusion: Trustworthy\n'
      return msg;
    } catch(e){
      console.log('Failed to check modder, error: ' + e);
      return false;
    }
  }


  checkModder(info, name){
    try{
      let msg = '__**Risk assessment of ' + name + '**__\n';
      msg += '*' + info.extra.crew +'*\n';
      msg += '\n';
  	  //if someone picked up >5m he can be considered a squeaker at least
      msg += (this.parseToInt(info.cash['Picked up']) > 5000000)?'[X] Squeeker\n':'[   ] Squeeking\n';
  	  //if someone picked up >75m we can assume him to be a possible modder
      msg += (this.parseToInt(info.cash['Picked up']) > 75000000)?'[X] Money dropping\n':'[   ] Money dropping\n';
      msg += ((info.extra.level < 40 && (info.extra.cash+info.extra.bank) > 40000000) || (info.extra.cash+info.extra.bank) > 100000000 )? '[X] Modded money\n':'[   ] Modded money\n';
  	  //if someone has an absurd K/D of 15 plus we can flag him for griefing or godmode
      msg += (this.parseToInt(info.combat['Player vs Player Kill / Death ratio']) > 15)?'[X] Godmode\n':'[   ] Godmode\n';
  	  //if accuracy is above 80% we can flag someone for aimbots
      msg += (this.parseToInt(info.combat['Accuracy']) > 80)?'[X] Aimbot\n':'[   ] Aimbot\n';
  	  //if someone reaches > 270mph he was probably using a glitched vehicle, but > 350mph indicates a speedhack
      msg += (this.parseToInt(info.vehicles['Highest speed in a road vehicle']) > 260)?'[X] Speedhack\n':'[   ] Speedhack\n';

      let fastest = this.parseToInt(info.vehicles['Highest speed in a road vehicle'].substr(0,info.vehicles['Highest speed in a road vehicle'].length-4));
      msg += (fastest > 200 && info.vehicles['Road vehicle driven fastest'].match(/^.{0,}(Deluxo|Visiris|Rapid|Comet|811|X80).{0,}$/i))? '[X] Speedglitch\n' : '[   ] Speedglitch\n';
      // Check modded lvl
      let time = info.career['Time spent in GTA Online'];
      let hours = (time.split('h')[0] == '')?0:time.split('h')[0];
      hours = (hours.split('d ')[1] == '')?0:parseInt(hours.split('d ')[1]);
      hours += 24 * ((time.split('d')[0] == '')?0:parseInt(time.split('d')[0]));
      msg += ((info.extra.level > 100 && hours < 75 )|| (info.extra.level > 100 && info.extra.level > (hours*2)))?'[X] Modded level\n':'[   ] Modded level\n';
      // Check modded stats
      msg += (info.extra.level < 80 && this.sumSkills(info.skills) >= 700)? '[X] Modded stats\n' : '[   ] Modded stats\n';
      //If someone spent > 20 days online but is below level 200 we can flag him for smurfing
      time = info.general['Time played as character'];
      let days = time.split('d')[0];
      let time2 = info.career['Time spent in GTA Online'];
      let days2 = time2.split('d')[0];
      msg += (days < (0.20*days2))?'[X] Smurfing\n':'[   ] Smurfing\n';
      // if a person has less then 1 minute of wanted time per hour in-game he is clearly using mods
      let timeWanted = info.crimes['Time spent with a Wanted Level'];
      let hoursWanted = (timeWanted.split('h')[0] == '')?0:timeWanted.split('h')[0];
      hoursWanted += 24*(hoursWanted.split('d ')[1] == '')?0:parseInt(hoursWanted.split('d ')[1]);
      msg += hoursWanted < (days*24)? '[X] Wanted-level Hack\n':'[   ] Wanted-level Hack\n';

      msg += (this.parseToInt(info.crimes['Wanted stars attained']) < 5000 && this.parseToInt(info.crimes['Cops killed']) > 3000)?'[X] Wanted level hack\n':'[   ] Wanted level hack\n';
      //someone is cheating for ammo when his money spent on ammo is less than his shots*5
      msg += (this.parseToInt(info.cash['Spent on weapons & armor']) < this.parseToInt(info.combat['Shots'])*5)?'[X] Ammo cheat\n':'[   ] Ammo cheat\n';
  	  //if someone has little over half as much suicides as he has kills while having a K/D of > 2, he uses EWO tactics.
  	  let suicides = this.parseToInt(info.general['Total deaths'])-this.parseToInt(info.general['Total deaths by players'])-this.parseToInt(info.general['Deaths by explosion'])-this.parseToInt(info.general['Deaths by falling']);
      suicides = suicides - this.parseToInt(info.general['Deaths by fire'])-this.parseToInt(info.general['Deaths by traffic'])-this.parseToInt(info.general['Deaths by drowning']);
  	  msg += suicides > (0.6*this.parseToInt(info.combat['Player kills']))?'[X] EWO alert\n':'[   ] EWO alert\n';
      //(money spent on ammo) minus (shots*20) multiplied by 0.70 equals the estimated ammount of orbital strikes used
      let diff = this.parseToInt(info.cash['Spent on weapons & armor'])-this.parseToInt(info.combat['Shots'])*20;
      diff = (diff > 0)?diff:0;
      let orbital = parseInt(0.75*diff/750000) + '/' + parseInt(0.75*diff/500000);
      msg += '\nEstimated orbital-strike\'s: ' + orbital + '\n';
  	  msg += '\n';
  	  msg += '*Rockstar promises, Nightmare MC delivers.*\n';
      return msg;
    } catch(e){
      console.log('Failed to check modder, error: ' + e);
      return false;
    }
  }

  getSkills(info, name){
    try{
      let msg = '__**Skill progression of ' + name + '**__\n';
      msg += '*' + info.extra.crew +'*\n';
      msg += '\n';
      let keys = Object.keys(info.skills);
      for(let i = 0; i<keys.length; i++){
        msg += keys[i] + ': ' + info.skills[keys[i]] + '%\n';
      }
      msg += 'Combined: '+ Math.floor(this.sumSkills(info.skills)/7) + '%'
      return msg;
    } catch(e){
      console.log('Failed to check modder, error: ' + e);
      return false;
    }
  }

  parseToInt(int){
    if(int == undefined)return 'HERE WENT SOMETHING WRONG';
    if(int.substr(int.length-1) == '%' || int.substr(int.length-1) == 'h')
      int = int.substr(0, int.length-1);
    if(int.substr(int.length-1) == 'K'){
      int = int.substr(0,int.length-1);
      int += int.indexOf('.') == -1)?'000':'00';
      int = int.replace(',', '').replace('.', '');
    } else if(int.substr(int.length-1) == 'M'){
      int = int.substr(0,int.length-1);
      int += (int.indexOf('.') == -1)'000000':'00000';
      int = int.replace(',', '').replace('.', '');
    } else {
      int = int.replace(',', '');
    }
    if(int.substr(0,1) == '$')
      int = int.substr(1);
    return parseInt(int);
  }

  getFavWeapon(obj){
    let keys = Object.keys(obj);
    let highestKey = 'RPG kills';
    let highestValue = 0;
    for(let i=0; i < keys.length; i++){
      if(this.parseToInt(list[keys[i]]) > highestValue){
        highestValue = this.parseToInt(obj[keys[i]]);
        highestKey = keys[i];
      }
    }
    return highestKey.substr(0,highestKey.length-6);
  }

  sumSkills(skills){
    let sum = 0;
    let keys = Object.keys(skills);
    for(let i = 0; i<keys.length-1; i++){
      sum += parseInt(skills[keys[i]]);
    }
    return sum;
  }
}
