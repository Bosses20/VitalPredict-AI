import { HTMLAttributes, ButtonHTMLAttributes, AnchorHTMLAttributes } from "react";
import { cva } from "class-variance-authority";

const classes = cva('border h-12 rounded-full px-6 font-medium', {
    variants: {
        variant: {
            primary: 'bg-lime-400 text-neutral-950 border-lime-400',
            secondary: 'border-white text-white bg-transparent',
        },
        size: {
            sm: 'h-10',
            lg: 'h-14 px-8 text-lg',
        }
    }
})

type ButtonProps = {
    variant: "primary" | "secondary";
    size?: "sm" | "lg";
    className?: string;
    href?: string;
} & (
    | (ButtonHTMLAttributes<HTMLButtonElement> & { href?: never })
    | (AnchorHTMLAttributes<HTMLAnchorElement> & { href: string })
);

export default function Button(props: ButtonProps) {  
    const { variant, size, className, href, ...otherProps } = props;
    
    if (href) {
        return <a 
            href={href}
            className={classes({ variant, size, className })}
            {...(otherProps as AnchorHTMLAttributes<HTMLAnchorElement>)}
        />;
    }
    
    return <button 
        className={classes({ variant, size, className })}
        {...(otherProps as ButtonHTMLAttributes<HTMLButtonElement>)}
    />;
}
