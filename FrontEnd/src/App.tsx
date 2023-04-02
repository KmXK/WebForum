import React, { useEffect, useState } from 'react';
import styles from './App.module.scss'
import { getAllSections } from './services/section.service';
import { SectionTree } from './models/section-tree.model';

const App = () => {
    const [sections, setSections] = useState<SectionTree[]>([]);

    useEffect(() => {
        getAllSections()
            .then(s => {
                setSections(s);
                console.log(s)
            });
    }, []);

    return (
        <div className={ styles.container }>
            <ul>
                { sections.map(s => (
                    <li key={ s.id }>
                        { s.name }
                        { s.sections?.length !== 0 && (
                            <div style={ {
                                position: 'relative',
                                left: 20
                            } }>
                                <ul>
                                    { s.sections.map(ss => (
                                        <li key={ ss.id }>
                                            { ss.name }
                                        </li>
                                    )) }
                                </ul>
                            </div>
                        ) }
                    </li>
                )) }
            </ul>
        </div>
    );
};

export default App;