$(function() {
  var model = {
    cats: [
      { name: "Andy", image: "http://designcalorie.com/wp-content/uploads/2013/03/Cute-Kitty-Wallpaper-500x312.jpg"},
      { name: "Boby", image: "http://designcalorie.com/wp-content/uploads/2013/03/Cat-Wallpaper-500x312.jpg"},
      { name: "Cindy", image: "http://designcalorie.com/wp-content/uploads/2013/03/Cute-Cat-Wallpaper-500x400.jpg"},
      { name: "Derek", image: "http://designcalorie.com/wp-content/uploads/2013/03/Cute-Cat-Wallpapers-500x312.jpg"},
      { name: "Frank", image: "http://designcalorie.com/wp-content/uploads/2013/03/Cat-Cute-Love-500x375.jpg"}
    ],

    isInAdminMode: false,

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
    updateCat: function(cat) {
            this.current.name = cat.name;
            this.current.image = cat.image;
            this.current.counter = cat.counter;
          },
    setCurrent: function(cat) {
            this.current = cat;
          },
    setAdminMode: function(mode) {
            model.isInAdminMode = mode;
          },
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
            adminView.init();
          },
    setCurrent: function(cat) {
            model.setCurrent(cat);
            catView.render();
          },
    updateCat: function(cat) {
            model.updateCat(cat);
            catView.render();
          },
    isInAdminMode: function() {
            return model.isInAdminMode;
          },
    setAdminMode: function(mode) {
            model.setAdminMode(mode);
            adminView.render();
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

  var adminView = {
    init: function() {
            this.adminButton = $('button#admin');
            this.adminDisplay = $('div#adminView');
            this.adminButton.click(function(){
              octopus.setAdminMode(true);
            });

            this.adminName = this.adminDisplay.find('[name=name]');
            this.adminImage = this.adminDisplay.find('[name=image]');
            this.adminCount = this.adminDisplay.find('[name=count]');
            this.adminDisplay.find('[name=cancel]').click(function(){
              octopus.setAdminMode(false);
            });
            this.adminDisplay.find('form').submit(this.submit);
            this.render();
          },
    submit: function(event) {
              var cat = {};
              cat.name = adminView.adminName.val();
              cat.image = adminView.adminImage.val();
              cat.counter = adminView.adminCount.val();
              octopus.updateCat(cat);
              return false;
            },
    render: function() {
            var isInAdmin = octopus.isInAdminMode();
            this.adminButton.prop("disabled", isInAdmin);
            this.adminDisplay.toggle(isInAdmin);
            var cat = octopus.getCat();
            this.adminName.val(cat.name); 
            this.adminImage.val(cat.image); 
            this.adminCount.val(cat.counter); 
          },
  };

  octopus.init();
});
