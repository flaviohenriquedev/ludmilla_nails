import {InputHTMLAttributes, ReactNode} from "react";

export interface ChildrenProps {children: ReactNode}

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {}
