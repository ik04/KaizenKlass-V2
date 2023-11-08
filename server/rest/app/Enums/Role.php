<?php

namespace App\Enums;

enum Role: int
{
    case CONTRIBUTOR = 0;
    case CROSSCHECKER = 1;
    case ADMIN = 2;
}