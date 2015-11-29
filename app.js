$(function() {
  var model = {
    cats: [
      { name: "Andy", image: "cat_picture1.jpg"},
      { name: "Boby", image: "cat_picture2.jpeg"},
      { name: "Cindy", image: "cat_picture3.jpeg"},
      { name: "Derek", image: "cat_picture4.jpeg"},
      { name: "Frank", image: "cat_picture5.jpeg"}
    ],

    init: function() {
            this.current = 0;
            model.cats.forEach(function(cat, i) { model.cats[i]['counter'] = 0});
          },
    increaseCurrent: function() {
            model.cats[this.current].counter ++;
          },
    getCurrent: function() {
            return model.cats[this.current];
          },
    setCurrent: function(i) {
            this.current = i;
          }
  };

  var octopus = {
    increase: function() {
            model.increaseCurrent();
            catView.render();    
          },
    getCats: function() {
            return model.cats;
          },
    getCat: function() {
            return model.getCurrent();
            },
    init: function() {
            model.init();
            catsView.init();
            catView.init();
          },
    setCurrent: function(i) {
            model.setCurrent(i);
            catView.render();
          },
  };

  var catsView = {
    init: function() {
            this.buttonsContainer = $('#buttons');
            this.buttonTemp = _.template($('script.template#button').html(), {variable: "cats"});
            catsView.render();
          },
    render: function() {
            this.buttonsContainer.html(this.buttonTemp(octopus.getCats()));
            this.buttonsContainer.find('button').click(function(){
              octopus.setCurrent($('button').index(this));
            });
          }
  };

  var catView = {
    init: function() {
            this.catContainer = $('#cat');
            this.catTemp = _.template($('script.template#panel').html(), {variable: "cat"});
            catView.render();
          },
    render: function() {
            this.catContainer.html(this.catTemp(octopus.getCat()));
            this.catContainer.find('img').click(function(){
                octopus.increase();
            });
          },
  };

  octopus.init();
});
