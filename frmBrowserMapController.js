define({
  showMenu: false,
  init: function() {
    this.view.preShow = this.preShow;
    this.view.postShow = this.postShow;
    browserMapControllerContext = this;
    browserMapViewContext = this.view;
  },
  onNavigate: function(navigatingFromOtherForm) {
    if (navigatingFromOtherForm) {
      this.view.flxMenuSlideBar.left = "-70%"
    }
    },
  preShow: function() {
    this.view.flxHeaderShoppingCart.btnMenu.onClick = this.animateMainMenu;
    this.view.flxMenuSlideBar.sgmtMenu.onRowClick = this.onRowClickCallBck;
    this.view.btnSearch.onClick = this.prepareFormViewForSearch;
    this.view.txtSearchInput.onDone = this.prepareFormViewForSearch;
    this.view.flxDetailBarBrw.btnRemoveBar.onClick = this.animateCloseStoreDetailBar;
  },
  postShow: function() {},
  animateMainMenu: function() {
    this.showMenu = !this.showMenu;
    if (this.showMenu) {
      this.animateOpenMainMenu();
    } else {
      this.animateCloseMainMenu();
    }
  },
    animateOpenMainMenu: function() {
    var animationDef = {
      "100": {
        "top": "0dp",
        "left": "0dp"
      }
    };
    var animationConfig = {
      "duration": 1,
      "fillMode": kony.anim.FILL_MODE_FORWARDS
    };
    var animationDefObject = kony.ui.createAnimation(animationDef);
    this.view.flxMenuSlideBar.animate(animationDefObject, animationConfig);
  },
  animateCloseMainMenu: function() {
    var animationDef = {
      "100": {
        "top": "0dp",
        "left": "-70%"
      }
    };
    var animationConfig = {
      "duration": 1,
      "fillMode": kony.anim.FILL_MODE_FORWARDS
    };
    var animationDefObject = kony.ui.createAnimation(animationDef);
    this.view.flxMenuSlideBar.animate(animationDefObject, animationConfig);
  },
  prepareFormViewForSearch: function() {
    if(this.view.txtSearchInput.text != ""){
      this.animateCloseStoreDetailBar();
      this.startLocationsFabricServices();
    }

  },
    onRowClickCallBck: function(_, _, rowNumber) {
    let navigatingFromOtherForm = true;
    switch (rowNumber) {
      case 0:
        new kony.mvc.Navigation("Home").navigate(navigatingFromOtherForm);
        break;
      case 1:
        this.showMenu = !this.showMenu;
        this.animateCloseMainMenu();
        break;
      case 2:
        new kony.mvc.Navigation("ShoppingCart").navigate(navigatingFromOtherForm);
        break;
    }
  },
  startLocationsFabricServices: function() {
    if (this.view.txtSearchInput.text != "") {
      serviceMapRequest(this.successMapRequest, this.failureMapRequest);
    }
  },
  failureMapRequest: function() {
    alert("Fatal Error");
  },
  successMapRequest: function() {
    var headers = {};
    var options = {};
    var serviceName = "BestBuy";
    const integrationObj = KNYMobileFabric.getIntegrationService(serviceName);
    var operationName = "getStoresByCity";
    this.data = {
      "city": this.view.txtSearchInput.text
    };
    this.view.txtSearchInput.text = "";
    integrationObj.invokeOperation(operationName, headers, this.data, this.retrievingLocations.bind(this, "getStoresByCity"), this.failureCallback, options);
  },
  retrievingLocations: function(operationName, response) {
    this.locations = response.stores;
    for (var i = 0; i < this.locations.length; i++) {
      if (!this.locations[i].hasOwnProperty("lat")) {
        this.locations.splice(i, 1);
      }
    }
    if (this.locations.length !== 0) {
      console.log("I am printing from Form Controller");
      console.log(this.locations);
      sendLocationsToHTML(this.locations);
    } else {
      var basicProperties = {
        message: "No stores located in this city",
        alertType: constants.ALERT_TYPE_ERROR,
      };
      kony.ui.Alert(basicProperties);
    }
  },
  animateOpenStoreDetailBar: function(index) {
    let locationShown = this.locations[index];
    this.view.flxDetailBarBrw.lblAdress.text = locationShown.address;
    this.view.flxDetailBarBrw.lblLatitudeValue.text = locationShown.lat;
    this.view.flxDetailBarBrw.lblLongitudeValue.text = locationShown.lng;
    this.view.flxDetailBarBrw.lblCityValue.text = locationShown.city;
    this.view.flxDetailBarBrw.lblNameValue.text = locationShown.name;
    var animationDef = {
      "100": {
        "bottom": "0dp",
        "left": "0dp",
      }
    };
    var animationConfig = {
      "duration": 1,
      "fillMode": kony.anim.FILL_MODE_FORWARDS
    };
    var animationDefObject = kony.ui.createAnimation(animationDef);
    this.view.flxDetailBarBrw.animate(animationDefObject, animationConfig);
  },
  animateCloseStoreDetailBar: function() {
    var animationDef = {
      "100": {
        "bottom": "-300dp",
        "left": "0dp"
      }
    };
    var animationConfig = {
      "duration": 1,
      "fillMode": kony.anim.FILL_MODE_FORWARDS
    };
    var animationDefObject = kony.ui.createAnimation(animationDef);
    this.view.flxDetailBarBrw.animate(animationDefObject, animationConfig);
  },
});