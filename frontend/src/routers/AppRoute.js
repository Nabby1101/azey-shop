import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'
// import { GuardProvider, GuardedRoute } from 'react-router-guards';
import ChangePassword from '../components/Other/ChangePassword'
import LogoutScreen from '../layouts/logout';
import AboutPage from '../page/AboutPage';
import CartPage from '../page/CartPage';
import CheckOutPage from '../page/CheckOutPage';
import OrderHistoryPage from '../page/OrderHistoryPage';
import ContactPage from '../page/ContactPage';
import ForgetPasswordPage from '../page/ForgetPasswordPage';
import HomePage from '../page/HomePage';
import LoginPage from '../page/LoginPage';
import NewsPage from '../page/NewsPage';
import DetailNewsPage from '../page/DetailNewsPage';
import OrderPage from '../page/OrderPage';
import ProductDetailPage from '../page/ProductDetailPage';
import ProductPage from '../page/ProductPage';
import ProfilePage from '../page/ProfilePage';
import RegisterPage from '../page/RegisterPage';
import SearchPage from '../page/SearchPage';
import FavoritesProducts from '../components/Other/FavoritesProducts';
import ADM from '../admin/screens';
import ErrorPage from '../page/ErrorPage';
import Load from '../layouts/load';
import { connect } from 'react-redux';
import PrivateRoute from './PrivateRoute';
import PrivateRouteAdmin from './PrivateRouteAdmin';
const AppRoute = () => {

    return (

        <Switch>
            <Route exact path='/'> <HomePage /> </Route>
            <Route path='/login'> <LoginPage /> </Route>
            <Route path='/register'> <RegisterPage /> </Route>
            <Route path='/logout'> <LogoutScreen /></Route>
            <Route path='/forget-password'> <ForgetPasswordPage /></Route>
            <Route path='/change-password/:id'> <ChangePassword /></Route>
            <Route path='/change-password'> <ChangePassword /></Route>
            <Route path='/contact'> <ContactPage /> </Route>
            <Route path='/about'> <AboutPage /> </Route>
            <Route path='/profile'>
                <PrivateRoute>
                    <ProfilePage />
                </PrivateRoute>
            </Route>
            <Route path='/tim-kiem'> <SearchPage /></Route>
            <Route path='/danh-muc-ua-thich'>
                <PrivateRoute>
                    <FavoritesProducts />
                </PrivateRoute>
            </Route>
            <Route
                path={[
                    // '/category',
                    '/category/:slug',
                    '/color/:slug',
                    '/size/:slug',
                    '/category/:slug/:slug',
                    '/category/:slug/:slug/:slug',
                ]}>
                <ProductPage />
            </Route>

            <Route path='/product/:slug'> <ProductDetailPage /></Route>
            <Route path='/gio-hang/check-out'>
                <PrivateRoute>
                    <CheckOutPage />
                </PrivateRoute>
            </Route>
            <Route path='/gio-hang'> <CartPage /></Route>
            <Route path='/order/:id'> <OrderPage /></Route>
            <Route path='/lich-su-mua-hang'>
                <PrivateRoute>
                    < OrderHistoryPage />
                </PrivateRoute>
            </Route>
            <Route path='/tin-tuc/:slug'> <DetailNewsPage /></Route>
            <Route
                path={[
                    '/tin-tuc',
                    '/chu-de/:slug',
                ]}>
                <NewsPage />
            </Route>
            <Route path='/admin'>
                <PrivateRouteAdmin>
                    <ADM />
                </PrivateRouteAdmin>
            </Route>
            <Route path='*'> <ErrorPage /></Route>

        </Switch>

    )
};

export default AppRoute;

// const mapStateToProps = state => ({
//     user: state.user
// });

// export default connect(mapStateToProps, {})(AppRoute)




// const AppRoute2 = () => {
//     const requireAdmin = (to, from, next) => {
//         const isLogged =
//             JSON.parse(localStorage.getItem('userInfo')) !== null
//                 ? true
//                 : false;
//         const isAdmin =
//             JSON.parse(localStorage.getItem('userInfo')) !== null
//                 ? JSON.parse(localStorage.getItem('userInfo')).role === 0
//                     ? true
//                     : false
//                 : false;
//         switch (to.meta.auth) {
//             case 'admin': {
//                 if (isLogged) {
//                     if (isAdmin) {
//                         next();
//                     } else {
//                         next.redirect('/');
//                     }
//                 } else {
//                     next.redirect('/login');
//                 }
//                 break;
//             }
//             case 'no-admin': {
//                 if (isLogged) {
//                     next();
//                 } else {
//                     next.redirect('/login');
//                 }
//                 break;
//             }
//             default: {
//                 next();
//             }
//         }
//     };
//     return (
//         <GuardProvider
//             guards={[requireAdmin]}
//             loading={Load}
//             error={ErrorPage}
//         >
//             <Switch>
//                 <GuardedRoute
//                     path="/admin"
//                     component={ADM}
//                     meta={{ auth: 'admin' }}
//                 ></GuardedRoute>
//                 <GuardedRoute
//                     path="/login"
//                     component={LoginPage}
//                     meta={{ auth: 'admin' }}
//                 ></GuardedRoute>
//                 <GuardedRoute path="/register" component={RegisterPage} />
//                 <GuardedRoute path="/logout" component={LogoutScreen} />
//                 <GuardedRoute
//                     path="/forget-password"
//                     component={ForgetPasswordPage}
//                 />
//                 <GuardedRoute
//                     path="/change-password/:id"
//                     component={ForgetPasswordPage}
//                 />
//                 <GuardedRoute path="/contact" component={ContactPage} />
//                 <GuardedRoute path="/tim-kiem" component={SearchPage} />
//                 {/* <GuardedRoute path="/page/:slug" component={PagesScreen} /> */}
//                 <GuardedRoute
//                     path="/gio-hang/check-out"
//                     component={CheckOutPage}
//                 />
//                 <GuardedRoute path="/gio-hang" component={CartPage} />
//                 <GuardedRoute path="/order/:id" component={OrderPage} />
//                 <GuardedRoute
//                     path="/lich-su-mua-hang"
//                     component={OrderHistoryPage}
//                     meta={{ auth: 'no-admin' }}
//                 />
//                 <GuardedRoute
//                     path="/profile"
//                     component={ProfilePage}
//                     meta={{ auth: 'no-admin' }}
//                 />
//                 <GuardedRoute
//                     path="/change-password/:id"
//                     component={ChangePassword}
//                     meta={{ auth: 'no-admin' }}
//                 />
//                 <GuardedRoute
//                     path="/news/:slug"
//                     component={NewsPage}
//                 />
//                 <GuardedRoute
//                     path={['/news', '/chu-de/:slug']}
//                     component={NewsPage}
//                 />
//                 {/* <GuardedRoute
//                     path="/danh-muc-ua-thich"
//                     component={FavoritesScreen}
//                     meta={{ auth: 'no-admin' }}
//                 /> */}
//                 <GuardedRoute
//                     path={['/product/:slug']}
//                     component={ProductDetailPage}
//                 />
//                 <GuardedRoute
//                     path={[
//                         '/category/:slug',
//                         '/color/:slug',
//                         '/size/:slug',
//                         '/category/:slug/:slug',
//                         '/category/:slug/:slug/:slug',
//                     ]}
//                     component={ProductPage}
//                 />
//                 <GuardedRoute exact path="/" component={HomePage} />
//             </Switch>
//         </GuardProvider>
//     );
// };

// export default AppRoute2;
