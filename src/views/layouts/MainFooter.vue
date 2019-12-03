<template>
    <div class="navbar navbar-expand-lg navbar-light">
        <div class="text-center d-lg-none w-100">
            <button type="button" class="navbar-toggler dropdown-toggle" data-toggle="collapse"
                    data-target="#navbar-footer">
                <i class="icon-unfold mr-2"></i>
                Footer
            </button>
        </div>

        <div class="navbar-collapse collapse" id="navbar-footer">
            <span class="navbar-text">
                &copy; ۲۰۱۹. <a href="https://www.okex.ir">OKEX Exchange</a> توسط <a
                    href="https://www.ok-ex.co" target="_blank">OK-EX.CO</a>
            </span>

            <ul class="navbar-nav ml-lg-auto">
                <li class="nav-item">
                    <a href="#" class="navbar-nav-link">
                        <i class="icon-home4 mr-2"></i> &nbsp
                        اکسچنج
                    </a>
                </li>

                <li class="nav-item">
                    <a href="#" class="navbar-nav-link">
                        <i class="icon-lifebuoy mr-2"></i>
                        پشتیبانی
                    </a>
                </li>
            </ul>
        </div>
        <!-- /footer -->

    </div>
</template>

<script>
    export default {
        name: 'MainFooter'
    }
</script>
