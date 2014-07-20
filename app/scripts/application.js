'use strict';

window.PdxSweetsite = Ember.Application.create();

App.Router.map(function() {
  this.route("about", { path: "/about" });

  __device__ = navigator.userAgent.match(/(iPhone|iPod|iPad|Android|BlackBerry)/);
     
});

App.AboutRoute = Ember.Route.extend({
  model: function() {
    return ['Practice Agile methodologies and Behavior driven development.',
            'Focus on customer development (Lean Startups)',
            'Help startups & entrepreneurs build innovative products. (checkout: StartupDigest & StartupWeekend)',
            'Realize your apps should be device-agnostic and strive to develop cross-platform & responsive web apps.',
            'Focus on open-source: Javascript, Nodejs, Express, Ember.js, jQuery, Cordova, MongoDb, C#, RavenDB & ASP.Net MVC (yes, it is open) ',
            'Utilize the cloud: AppHarbor, Azure, Heroku, Amazon Web Services, RavenHQ, CloudMine'    
            ];
  }
});

App.Post = Ember.Object.extend({});

App.Post.reopenClass({
    getPosts: function() {
        var posts = []; 
        $.ajax({
            url: _TumblrUrl_,
            type: "GET",
            async: true,
            cache: true,
            dataType: "jsonp",
        }).then(function(response) {
            response.response.posts.forEach(function(post){
                var model = App.Post.create(post); 
                posts.addObject(model); //fill your array step by step
            });
        });
        return posts;
    }
});

App.IndexRoute = Ember.Route.extend({
     model: function(){
        if(!this.currentModel){ // so ajax doesn't fire on each load
            return App.Post.getPosts();
        }
        else {
          return this.currentModel;
        }
    }
});

App.IndexView = Em.View.extend({});

App.AboutView = Em.View.extend({});
