import React from 'react';

function link() {
    return (
        <div>
            <Routes>
                <nav>
<              link to="/">Home</link>
<              link to="/about">About</link>
                </nav>
                < Route path="/" element={Home} />
                <Route path="/about" element={About} />     
                
            </Routes>
        </div>
    )
}