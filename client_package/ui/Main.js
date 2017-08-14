function Main() {
    
    this.main = function() {
        this.outFromArea = document.getElementById("outFromArea");
        this.state = document.getElementById("state");
        this.outFromArea.style.display = "none";
        this.outFromArea.oc = 1;
        this.outFromArea.p = 0.005;
        setInterval(function() {
            var main = window.__MAIN;
            
            if(main.outFromArea.oc >= 1 || main.outFromArea.oc <= 0.5) {
                main.outFromArea.p *= -1;
            }
            
            main.outFromArea.oc += main.outFromArea.p;
            main.outFromArea.style.opacity = main.outFromArea.oc;
        }, 10);
        
        this.AddEvents();
    }
    
    this.AddEvents = function() {
        jcmp.AddEvent("armsrace/OutFromAreaWarning", function(display) {
            console.log.apply(console, ["OutFromAreaWarning", display]);
            var main = window.__MAIN;
            if(display == false) {
                display = "none";
            } else {
                display = "";
            }
            main.outFromArea.style.display = display;
        });
        
        jcmp.AddEvent("armsrace/stateInfo", function(stateName, time) {
            console.log.apply(console, ["stateInfo", stateName, time]);
            switch(stateName) {
                case "Freewalk":
                    this.state.innerHTML = "Waiting for one or more players...";
                    break;
                
                case "Race":
                    // To Do
                    break;
                
                case "LocationVote":
                    // To Do
                    break;
                
                default:
                    this.state.innerHTML = "";
                    break;
            }
        });
    }
}