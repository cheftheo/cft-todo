"use client";

import { useRouter } from 'next/navigation'
import {logout} from '../../../lib/auth';

export default function LogoutPage() {
    const router = useRouter()

    logout();
    router.push('/signin');
    console.log('logout');

    return ("Logging out...")
}

