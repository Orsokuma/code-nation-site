var Menu = (function() {
  var Menu = function() {}
  Menu.prototype.MAIN_MENU = 0
  Menu.prototype.RANK_MENU = 1
  Menu.prototype.bind = function(game, target, type) {
    this.view = target
    this.game = game
    this.score = new Score()
    if (type === this.MAIN_MENU)
      this.setListeners()
    else if (type === this.RANK_MENU)
      this.setRankListeners()
  }

  Menu.prototype.show = function() {
    this.view.classList.remove('display-none')
  }

  Menu.prototype.hide = function() {
    this.view.classList.add('display-none')
  }

  Menu.prototype.setScore = function(score) {
    this.view.querySelector('#score-panel').textContent = score
    this.score.saveScoreLocal(score)
    var highScore = this.score.getScoreLocal()
    this.view.querySelector('#high-score-panel').textContent = highScore
  }

  Menu.prototype.setListeners = function() {
    var menu = this
    this.view.querySelector('#resume-btn').addEventListener('click', function(e) {
      menu.game.start()
      menu.hide()
      if (menu.game.isLose) {
        menu.game.restart()
      }
    })
    this.view.querySelector('#start-btn').addEventListener('click', function(e) {
      menu.game.start()
      menu.hide()
      if (menu.game.isLose) {
        menu.game.restart()
      }
    })
    this.view.querySelector('#restart-btn').addEventListener('click', function(e) {
      menu.game.restart()
      menu.game.start()
      menu.hide()
    })
  }

  Menu.prototype.setRankListeners = function() {
    var menu = this
    this.view.querySelector('#next-btn').addEventListener('click', function(e) {
      menu.score.setScoreParse(menu.view.querySelector('#rank-name').value, menu.game.combo.score, function() {})

    })
    this.view.querySelector('#skip-btn').addEventListener('click', function(e) {
      menu.game.menu.view.classList.remove('display-none') // main menu
      menu.view.classList.add('display-none') // this menu
      menu.score.isSetScore = false
    })
  }

  return Menu
})()
