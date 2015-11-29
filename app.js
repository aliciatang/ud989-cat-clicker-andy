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
            model.cats.forEach(function(cat, i) { model.cats[i]['counter'] = 0});
            this.current = model.cats[0];
          },
    increaseCurrent: function() {
            this.current.counter ++;
          },
    getCurrent: function() {
            return this.current;
          },
    setCurrent: function(cat) {
            this.current = cat;
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
    setCurrent: function(cat) {
            model.setCurrent(cat);
            catView.render();
          },
  };

  var catsView = {
    init: function() {
            this.buttonsContainer = $('#buttons');
            this.buttonTemp = _.template($('script.template#button').html(), {variable: "cat"});
            catsView.render();
          },
    render: function() {
            var self = this;
            octopus.getCats().forEach(function(cat) {
              var button = $(self.buttonTemp(cat));
              button.click(function(){
                octopus.setCurrent(cat);
              });
              self.buttonsContainer.append(button);
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
