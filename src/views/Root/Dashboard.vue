<template>
    <div>
<!--        &lt;!&ndash; Quick stats boxes &ndash;&gt;-->
<!--        <div class="row">-->
<!--            <div class="col-lg-3">-->

<!--                &lt;!&ndash; Members online &ndash;&gt;-->
<!--                <div class="card">-->
<!--                    <div class="card-body">-->
<!--                        <div class="d-flex">-->
<!--                            <h3 class="font-weight-semibold mb-0">4,389</h3>-->
<!--                            <div class="list-icons ml-auto">-->
<!--                                <a class="list-icons-item" data-action="reload"></a>-->
<!--                            </div>-->
<!--                        </div>-->

<!--                        <div>-->
<!--                            Orders weekly-->
<!--                            <div class="text-muted font-size-sm">4,728 avg</div>-->
<!--                        </div>-->
<!--                    </div>-->

<!--                    <div id="line_chart_simple"></div>-->
<!--                </div>-->
<!--                &lt;!&ndash; /members online &ndash;&gt;-->

<!--            </div>-->
<!--            <div class="col-lg-3">-->

<!--                &lt;!&ndash; Members online &ndash;&gt;-->
<!--                <div class="card">-->
<!--                    <div class="card-body">-->
<!--                        <div class="d-flex">-->
<!--                            <h3 class="font-weight-semibold mb-0">4,389</h3>-->
<!--                            <div class="list-icons ml-auto">-->
<!--                                <a class="list-icons-item" data-action="reload"></a>-->
<!--                            </div>-->
<!--                        </div>-->

<!--                        <div>-->
<!--                            Orders weekly-->
<!--                            <div class="text-muted font-size-sm">4,728 avg</div>-->
<!--                        </div>-->
<!--                    </div>-->

<!--                    <div id="line_chart_simple2"></div>-->
<!--                </div>-->
<!--                &lt;!&ndash; /members online &ndash;&gt;-->

<!--            </div>-->
<!--            <div class="col-lg-3">-->

<!--                &lt;!&ndash; Members online &ndash;&gt;-->
<!--                <div class="card">-->
<!--                    <div class="card-body">-->
<!--                        <div class="d-flex">-->
<!--                            <h3 class="font-weight-semibold mb-0">4,389</h3>-->
<!--                            <div class="list-icons ml-auto">-->
<!--                                <a class="list-icons-item" data-action="reload"></a>-->
<!--                            </div>-->
<!--                        </div>-->

<!--                        <div>-->
<!--                            Orders weekly-->
<!--                            <div class="text-muted font-size-sm">4,728 avg</div>-->
<!--                        </div>-->
<!--                    </div>-->
<!--                    <div id="line_chart_simple3"></div>-->
<!--                </div>-->
<!--                &lt;!&ndash; /members online &ndash;&gt;-->

<!--            </div>-->
<!--            <div class="col-lg-3">-->

<!--                &lt;!&ndash; Members online &ndash;&gt;-->
<!--                <div class="card">-->
<!--                    <div class="card-body">-->
<!--                        <div class="d-flex">-->
<!--                            <h3 class="font-weight-semibold mb-0">4,389</h3>-->
<!--                            <div class="list-icons ml-auto">-->
<!--                                <a class="list-icons-item" data-action="reload"></a>-->
<!--                            </div>-->
<!--                        </div>-->

<!--                        <div>-->
<!--                            Orders weekly-->
<!--                            <div class="text-muted font-size-sm">4,728 avg</div>-->
<!--                        </div>-->
<!--                    </div>-->
<!--                    <div id="line_chart_simple4"></div>-->
<!--                </div>-->
<!--                &lt;!&ndash; /members online &ndash;&gt;-->

<!--            </div>-->
<!--        </div>-->
<!--        &lt;!&ndash; /quick stats boxes &ndash;&gt;-->

<!--        &lt;!&ndash; Basic card &ndash;&gt;-->
<!--        <div class="card">-->
<!--            <div class="card-header header-elements-inline">-->
<!--                <h5 class="card-title">Basic card</h5>-->
<!--                <div class="header-elements">-->
<!--                    <div class="list-icons">-->
<!--                        <a class="list-icons-item" data-action="collapse"></a>-->
<!--                        <a class="list-icons-item" data-action="reload"></a>-->
<!--                        <a class="list-icons-item" data-action="remove"></a>-->
<!--                    </div>-->
<!--                </div>-->
<!--            </div>-->

<!--            <div class="card-body">-->
<!--                <h6 class="font-weight-semibold">Start your development with no hassle!</h6>-->
<!--                <p class="mb-3">Common problem of templates is that all code is deeply integrated into the-->
<!--                    core. This limits your freedom in decreasing amount of code, i.e. it becomes pretty-->
<!--                    difficult to remove unnecessary code from the project. Limitless allows you to remove-->
<!--                    unnecessary and extra code easily just by removing the path to specific LESS file with-->
<!--                    component styling. All plugins and their options are also in separate files. Use only-->
<!--                    components you actually need!</p>-->

<!--                <h6 class="font-weight-semibold">What is this?</h6>-->
<!--                <p class="mb-3">Starter kit is a set of pages, useful for developers to start development-->
<!--                    process from scratch. Each layout includes base components only: layout, page kits,-->
<!--                    color system which is still optional, bootstrap files and bootstrap overrides. No extra-->
<!--                    CSS/JS files and markup. CSS files are compiled without any plugins or components.-->
<!--                    Starter kit was moved to a separate folder for better accessibility.</p>-->

<!--                <h6 class="font-weight-semibold">How does it work?</h6>-->
<!--                <p>You open one of the starter pages, add necessary plugins, uncomment paths to files in-->
<!--                    components.less file, compile new CSS. That's it. I'd also recommend to open one of main-->
<!--                    pages with functionality you need and copy all paths/JS code from there to your new-->
<!--                    page, it's just faster and easier.</p>-->
<!--            </div>-->
<!--        </div>-->
<!--        &lt;!&ndash; /basic card &ndash;&gt;-->
    </div>
</template>

<script>
    export default {
        name: 'Home',

        metaInfo: {
            title: 'پیشخوان'
        },

        breadcrumb: () => ([
            {label: 'پیشخوان', to: '/', icon: 'home2'},
        ]),

        created () {
            // let recaptchaScript2 = document.createElement('script')
            // recaptchaScript2.setAttribute('src', '/global_assets/js/plugins/visualization/d3/d3_tooltip.js')
            // document.body.appendChild(recaptchaScript2)
            //
            // let recaptchaScript3 = document.createElement('script')
            // recaptchaScript3.setAttribute('src', '/global_assets/js/demo_pages/widgets_stats.js')
            // document.body.appendChild(recaptchaScript3)
        }
    }
</script>
