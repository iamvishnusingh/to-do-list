import { useState } from 'react';
import React from 'react'
import Tasks from './Tasks';
import Sidebar from './Sidebar';

function Content() {
        const [selectTab, setselectTab] = useState("INBOX");

    return <section className="content">
    <Sidebar selectTab={selectTab} setselectTab={setselectTab} />
    <Tasks selectTab={selectTab} />

    </section>
}

export default Content
