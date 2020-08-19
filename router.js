class Router {
  constructor(routes){
    this.routes = routes;
    this._loadInitialRoutes();
  }

  loadRoute(...urlSegs){
    const matchedRoute = this._matchUrlToRoute(urlSegs);
    // console.log('matchedRoute: ', matchedRoute);

    const url = `/${urlSegs.join('/')}`;
    history.pushState({},'this works', url);

    const routerOutElm = document.querySelectorAll('[data-router]')[0];
    routerOutElm.innerHTML = matchedRoute.template;
  }
  
  _matchUrlToRoute(urlSegs){
    const matchedRoute = this.routes.find(route => {
      const routePathSegs = route.path.split('/').slice(1);
      // console.log('routePathSegs: ', routePathSegs);
      if(routePathSegs.length !== urlSegs.length){
        return false;
      }
      return routePathSegs
        .every((routePathSeg, i) => routePathSeg === urlSegs[i]);
    });
    return matchedRoute;
  }

  _loadInitialRoutes(){
    const pathNameSplit = window.location.pathname.split('/');
    // console.log('pathNameSplit: ', pathNameSplit);
    const pathSegs = pathNameSplit.length > 1 ? pathNameSplit.slice(1) : '';
    // console.log('pathSegs: ', pathSegs);
    this.loadRoute(...pathSegs);
  }
}
