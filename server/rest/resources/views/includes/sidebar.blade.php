<aside id="sidebar" class="sidebar">

    <ul class="sidebar-nav" id="sidebar-nav">

        <li class="nav-item">
            <a class="nav-link " href="{{ route('home') }}">
                <i class="bi bi-grid"></i>
                <span>Dashboard</span>
            </a>
        </li><!-- End Dashboard Nav -->

        <li class="nav-item">
            <a class="nav-link collapsed" data-bs-target="#components-nav" data-bs-toggle="collapse" href="#">
                <i class="bi bi-menu-button-wide"></i><span>Subjects</span><i class="bi bi-chevron-down ms-auto"></i>
            </a>
            <ul id="components-nav" class="nav-content collapse " data-bs-parent="#sidebar-nav">
                <li>
                    <a href="/view/subjects">
                        <i class="bi bi-circle"></i><span>View Subjects</span>
                    </a>
                </li>
                <li>
                    <a href="/add/subjects">
                        <i class="bi bi-circle"></i><span>Add Subjects</span>
                    </a>
                </li>
            </ul>
        </li><!-- End Components Nav -->

        <li class="nav-item">
            <a class="nav-link collapsed" data-bs-target="#forms-nav" data-bs-toggle="collapse" href="#">
                <i class="bi bi-journal-text"></i><span>Users</span><i class="bi bi-chevron-down ms-auto"></i>
            </a>
            <ul id="forms-nav" class="nav-content collapse " data-bs-parent="#sidebar-nav">
                <li>
                    <a href="/view/users">
                        <i class="bi bi-circle"></i><span>View Users</span>
                    </a>
                </li>
                <li>
                    <a href="/add/users">
                        <i class="bi bi-circle"></i><span>Add Users</span>
                    </a>
                </li>
            </ul>
        </li><!-- End Forms Nav -->
    </ul>

</aside><!-- End Sidebar-->
