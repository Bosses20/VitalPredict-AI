import { twMerge } from "tailwind-merge";

export default function Pointer(props: { name: string; color?: 'red' | 'blue' }) {
    const { name, color } = props;
    return (
        <div className="relative flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={twMerge("size-4 rotate-[15deg]", color === 'red' ? 'text-red-400' : 'text-blue-400')}>
                <path d="M3 3l7.07 16.97 2.51-7.39 7.39-2.51L3 3"></path>
            </svg>
            <div className={twMerge("rounded-full px-2 py-1", color === 'red' ? 'bg-red-400/10' : 'bg-blue-400/10')}>
                <span className={twMerge("text-sm font-medium", color === 'red' ? 'text-red-400' : 'text-blue-400')}>{name}</span>
            </div>
        </div>
    );
}