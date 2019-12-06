
const Todo_item=Backbone.Model.extend({
    initialize: function(option){
   
    },
    defaults: {
        "name":"",
        "time":Date().toString("yyyy/MM/dd"),
        "status":false,
    }
});
const Todo_collection=Backbone.Collection.extend({
    Model:Todo_item,
    
        url: './api/items.json',
   
    parse: function(response) {
        
        return response.items;
      }
})

const AllItems=new Todo_collection({});


AllItems.fetch({});
       
$('.Add-Button').click(function(){
    if($('#todo-text-box').val()!=''){
        AllItems.add(new Todo_item({name:$('#todo-text-box').val()}))
        
    }
})


const Todo_item_view=Backbone.View.extend({
    tagName:'p',
    events:{
        'click .delete':function(){
            
            AllItems.remove(this.model)
            
        },
        'click #myCheck':function(event){
            const ischecked=$(event.target).is(":checked");
            const present=this.model.set("status",ischecked);
            todo_collection_view.add();
        },
        },
        
        
        addcheck(){
            
            
            this.$el.children('input').attr('checked', this.model.get('status'));
            if(this.model.get('status')===true)
            {
                this.$el.children('input').next().toggleClass("strike");
            }
        },
    render(){
       const self=this;
        
        $.get('Templates/template.html',function(data){
            my_template = _.template(data);
            self.$el.html(my_template(self.model.toJSON()));
            self.addcheck(self.$el);
        });
        
        
        
        return self;
        
    }
})
const Todo_collection_view=Backbone.View.extend({
    el:"#main-table",
    initialize(){
        this.model.on('add remove',this.add,this)
    },
    add:function(){
        this.$el.empty();
        this.render();
    },
    render(){
        
        this.model.each(todo =>{
           const eachview= new Todo_item_view({model:todo});
           this.$el.append(eachview.render().$el);
        })
        return this;    
        
    }

})
const todo_collection_view=new Todo_collection_view({model:AllItems});
todo_collection_view.render();

$('.deleteSelected').click(()=>{
    
    var removes = [];
   AllItems.each(item =>{
       if(item.get('status')==true){
           removes.push(item)
       }
   })
   
AllItems.remove(removes);
   
})
$('.deleteAll').click(()=>{
    AllItems.reset();
    todo_collection_view.add();
})
