var Score = (function() {
  var Score = function() {}

  Score.prototype.saveScoreLocal = function(score) {
    var curScore = localStorage.getItem('tetris-score')
    if (!curScore || score > curScore)
      localStorage.setItem('tetris-score', score)
  }

  Score.prototype.getScoreLocal = function() {
    var score = localStorage.getItem('tetris-score')
    return score ? score : -1
  }

  Score.prototype.setScoreParse = function(name, score, callback) {
    var scoreCls = this
    if (scoreCls.isSetScore)
      return
    var ScoreObj = this.ScoreObj
    var scoreObj = new ScoreObj()
    scoreObj.save({
      name: name,
      score: score
    }).then(function(object) {
      scoreCls.isSetScore = true
    })
  }

  return Score
})()
