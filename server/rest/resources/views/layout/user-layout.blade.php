<!DOCTYPE html>
<html lang="en">

@include('includes/head')

<body>

    <!-- ======= Header ======= -->
    @include('includes/header')

    <!-- ======= Sidebar ======= -->
    @include('includes/sidebar')


    <main id="main" class="main">
        @yield('content')
    </main><!-- End #main -->

    <!-- ======= Footer ======= -->
    @include('includes/footer')
</body>

</html>
