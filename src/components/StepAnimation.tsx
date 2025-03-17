"use client";

import Lottie from "lottie-react";

// Voice Recording Animation
const recordingData = {
    v: "5.7.14",
    fr: 60,
    ip: 0,
    op: 180,
    w: 100,
    h: 100,
    assets: [],
    layers: [
        {
            ddd: 0,
            ind: 1,
            ty: 4,
            nm: "Wave",
            sr: 1,
            ks: {
                o: { a: 0, k: 100 },
                p: { a: 0, k: [50, 50, 0] },
                a: { a: 0, k: [0, 0, 0] },
                s: { a: 0, k: [100, 100, 100] }
            },
            ao: 0,
            shapes: [
                {
                    ty: "gr",
                    it: [
                        {
                            ind: 0,
                            ty: "sh",
                            ix: 1,
                            ks: {
                                a: 1,
                                k: [
                                    {
                                        i: { x: 0.5, y: 1 },
                                        o: { x: 0.5, y: 0 },
                                        t: 0,
                                        s: [
                                            {
                                                i: [[0, 0], [0, 0], [0, 0], [0, 0], [0, 0]],
                                                o: [[0, 0], [0, 0], [0, 0], [0, 0], [0, 0]],
                                                v: [[-40, 0], [-20, -30], [0, 0], [20, -30], [40, 0]]
                                            }
                                        ]
                                    },
                                    {
                                        t: 90,
                                        s: [
                                            {
                                                i: [[0, 0], [0, 0], [0, 0], [0, 0], [0, 0]],
                                                o: [[0, 0], [0, 0], [0, 0], [0, 0], [0, 0]],
                                                v: [[-40, 0], [-20, 30], [0, 0], [20, 30], [40, 0]]
                                            }
                                        ]
                                    }
                                ]
                            },
                            nm: "Path 1",
                            mn: "ADBE Vector Shape - Group"
                        },
                        {
                            ty: "st",
                            c: { a: 0, k: [0.2, 0.4, 1, 1] },
                            o: { a: 0, k: 100 },
                            w: { a: 0, k: 4 },
                            lc: 2,
                            lj: 2,
                            bm: 0,
                            nm: "Stroke 1",
                            mn: "ADBE Vector Graphic - Stroke"
                        }
                    ],
                    nm: "Wave Group",
                    np: 2,
                    cix: 2,
                    bm: 0,
                    ix: 1,
                    mn: "ADBE Vector Group"
                }
            ],
            ip: 0,
            op: 180,
            st: 0,
            bm: 0
        }
    ]
};

// AI Analysis Animation
const analysisData = {
    v: "5.7.14",
    fr: 60,
    ip: 0,
    op: 180,
    w: 100,
    h: 100,
    assets: [],
    layers: [
        {
            ddd: 0,
            ind: 1,
            ty: 4,
            nm: "Brain",
            sr: 1,
            ks: {
                o: { a: 0, k: 100 },
                p: { a: 0, k: [50, 50, 0] },
                a: { a: 0, k: [0, 0, 0] },
                s: {
                    a: 1,
                    k: [
                        {
                            i: { x: [0.5, 0.5, 0.5], y: [1, 1, 1] },
                            o: { x: [0.5, 0.5, 0.5], y: [0, 0, 0] },
                            t: 0,
                            s: [95, 95, 100]
                        },
                        {
                            t: 90,
                            s: [105, 105, 100]
                        }
                    ]
                }
            },
            ao: 0,
            shapes: [
                {
                    ty: "gr",
                    it: [
                        {
                            ty: "rc",
                            d: 1,
                            s: { a: 0, k: [40, 40] },
                            p: { a: 0, k: [0, 0] },
                            r: { a: 0, k: 8 },
                            nm: "Rectangle Path 1",
                            mn: "ADBE Vector Shape - Rect"
                        },
                        {
                            ty: "fl",
                            c: { a: 0, k: [0.4, 0.8, 0.2, 1] },
                            o: { a: 0, k: 100 },
                            r: 1,
                            bm: 0,
                            nm: "Fill 1",
                            mn: "ADBE Vector Graphic - Fill"
                        }
                    ],
                    nm: "Brain Group",
                    np: 2,
                    cix: 2,
                    bm: 0,
                    ix: 1,
                    mn: "ADBE Vector Group"
                }
            ],
            ip: 0,
            op: 180,
            st: 0,
            bm: 0
        }
    ]
};

// Alert Animation
const alertData = {
    v: "5.7.14",
    fr: 60,
    ip: 0,
    op: 180,
    w: 100,
    h: 100,
    assets: [],
    layers: [
        {
            ddd: 0,
            ind: 1,
            ty: 4,
            nm: "Alert",
            sr: 1,
            ks: {
                o: {
                    a: 1,
                    k: [
                        {
                            i: { x: [0.5], y: [1] },
                            o: { x: [0.5], y: [0] },
                            t: 0,
                            s: [50]
                        },
                        {
                            t: 90,
                            s: [100]
                        }
                    ]
                },
                p: { a: 0, k: [50, 50, 0] },
                a: { a: 0, k: [0, 0, 0] },
                s: { a: 0, k: [100, 100, 100] }
            },
            ao: 0,
            shapes: [
                {
                    ty: "gr",
                    it: [
                        {
                            ty: "sr",
                            sy: 1,
                            d: 1,
                            pt: { a: 0, k: 3 },
                            p: { a: 0, k: [0, 0] },
                            r: { a: 0, k: 0 },
                            or: { a: 0, k: 40 },
                            os: { a: 0, k: 0 },
                            ix: 1,
                            nm: "Polystar Path 1",
                            mn: "ADBE Vector Shape - Star"
                        },
                        {
                            ty: "fl",
                            c: { a: 0, k: [1, 0.4, 0.2, 1] },
                            o: { a: 0, k: 100 },
                            r: 1,
                            bm: 0,
                            nm: "Fill 1",
                            mn: "ADBE Vector Graphic - Fill"
                        }
                    ],
                    nm: "Alert Group",
                    np: 2,
                    cix: 2,
                    bm: 0,
                    ix: 1,
                    mn: "ADBE Vector Group"
                }
            ],
            ip: 0,
            op: 180,
            st: 0,
            bm: 0
        }
    ]
};

interface StepAnimationProps {
    type: "record" | "analyze" | "alert";
}

export default function StepAnimation({ type }: StepAnimationProps) {
    const animationData = {
        record: recordingData,
        analyze: analysisData,
        alert: alertData
    }[type];

    return (
        <div className="w-24 h-24">
            <Lottie
                animationData={animationData}
                loop={true}
                autoplay={true}
                style={{ width: "100%", height: "100%" }}
            />
        </div>
    );
}
