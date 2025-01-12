function skillsMember(name, skill) {
    return {
        name: name,
        skill: skill,
        displaySkill: function() {
            console.log(`${this.name} is skilled at ${this.skill}`);
        }
    };
}
