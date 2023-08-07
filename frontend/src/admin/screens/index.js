import React, { Component } from 'react'
import HomeAdmin from './HomeAdmin'
import { Helmet, HelmetProvider } from 'react-helmet-async'
function ADM() {
    return (
        <HelmetProvider>
            <Helmet>
                <link rel="stylesheet" href="admin/assets/css/bootstrap.min.css"></link>
                <link rel="stylesheet" href="admin/assets/css/lineicons.css"></link>
                <link rel="stylesheet" href="admin/assets/css/materialdesignicons.min.css"></link>
                <link rel="stylesheet" href="admin/assets/css/fullcalendar.css"></link>
                <link rel="stylesheet" href="admin/assets/css/main.css"></link>

            </Helmet>

            <HomeAdmin />
            
            <Helmet>
                <script src="admin/assets/js/bootstrap.bundle.min.js"></script>
                <script src="admin/assets/js/Chart.min.js"></script>
                <script src="admin/assets/js/dynamic-pie-chart.js"></script>
                <script src="admin/assets/js/moment.min.js"></script>
                <script src="admin/assets/js/fullcalendar.js"></script>
                <script src="admin/assets/js/jvectormap.min.js"></script>
                <script src="admin/assets/js/world-merc.js"></script>
                <script src="admin/assets/js/polyfill.js"></script>
                <script src="admin/assets/js/main.js"></script>
            </Helmet>
        </HelmetProvider>

    )
}

export default ADM