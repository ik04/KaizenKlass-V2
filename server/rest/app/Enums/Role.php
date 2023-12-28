<?php

namespace App\Enums;

enum Role: int
{
    case ADMIN = 0;
    case CROSSCHECKER = 1;
    case CONTRIBUTOR = 2;
}