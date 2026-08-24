import React from 'react';
import { Link } from 'react-router-dom';
import logoImg from '../../assets/logo.png';

/**
 * Legal Drishti Official Logo Component
 * 
 * @param {Object} props
 * @param {'xs'|'sm'|'md'|'lg'|'xl'|'2xl'} props.size - Size preset
 * @param {'badge'|'plain'|'dark'|'light'} props.variant - Visual display style
 * @param {string} props.className - Extra CSS classes
 * @param {boolean} props.showText - Whether to render "LEGAL DRISHTI" typography next to logo
 * @param {string} props.subtitle - Optional subtitle text
 * @param {string} [props.to] - Optional navigation path (e.g. '/dashboard' or '/')
 * @param {Function} [props.onClick] - Optional click handler
 */
const Logo = ({
  size = 'md',
  variant = 'badge',
  className = '',
  showText = false,
  subtitle = '',
  textColor = 'text-slate-900',
  subtextColor = 'text-slate-500',
  to = null,
  onClick = null
}) => {
  const sizeMap = {
    xs: { img: 'w-6 h-6', box: 'w-7 h-7 p-0.5', text: 'text-sm', sub: 'text-[8px]' },
    sm: { img: 'w-7 h-7', box: 'w-9 h-9 p-1', text: 'text-base', sub: 'text-[9px]' },
    md: { img: 'w-9 h-9', box: 'w-11 h-11 p-1.5', text: 'text-lg', sub: 'text-[10px]' },
    lg: { img: 'w-12 h-12', box: 'w-14 h-14 p-2', text: 'text-xl', sub: 'text-xs' },
    xl: { img: 'w-16 h-16', box: 'w-20 h-20 p-2.5', text: 'text-2xl', sub: 'text-xs' },
    '2xl': { img: 'w-24 h-24', box: 'w-28 h-28 p-3', text: 'text-3xl', sub: 'text-sm' },
  };

  const selectedSize = sizeMap[size] || sizeMap.md;

  const renderImage = () => (
    <img 
      src={logoImg} 
      alt="Legal Drishti Official Logo" 
      className={`object-contain transition-transform duration-200 group-hover:scale-105 ${
        variant === 'plain' ? selectedSize.img : 'w-full h-full'
      } ${variant === 'dark' ? 'brightness-110 drop-shadow' : ''}`}
      loading="eager"
    />
  );

  let iconContainer = null;

  if (variant === 'badge') {
    iconContainer = (
      <div className={`relative bg-white rounded-xl shadow-sm border border-slate-200/80 flex items-center justify-center overflow-hidden shrink-0 transition-all duration-200 group-hover:shadow-md group-hover:border-primary-300 ${selectedSize.box} ${className}`}>
        {renderImage()}
      </div>
    );
  } else if (variant === 'dark') {
    iconContainer = (
      <div className={`relative bg-white rounded-xl shadow-md p-1.5 flex items-center justify-center overflow-hidden shrink-0 border border-slate-700/50 group-hover:border-slate-500 ${selectedSize.box} ${className}`}>
        {renderImage()}
      </div>
    );
  } else if (variant === 'light') {
    iconContainer = (
      <div className={`relative bg-primary-50 rounded-xl border border-primary-100 p-1 flex items-center justify-center overflow-hidden shrink-0 shadow-inner group-hover:border-primary-300 ${selectedSize.box} ${className}`}>
        {renderImage()}
      </div>
    );
  } else {
    // plain
    iconContainer = (
      <div className={`shrink-0 flex items-center justify-center ${className}`}>
        {renderImage()}
      </div>
    );
  }

  const content = !showText ? (
    iconContainer
  ) : (
    <div className="flex items-center gap-3">
      {iconContainer}
      <div className="min-w-0">
        <h1 className={`font-display font-black tracking-wide leading-tight group-hover:text-primary-600 transition-colors ${selectedSize.text} ${textColor}`}>
          LEGAL DRISHTI
        </h1>
        {subtitle && (
          <p className={`font-semibold uppercase tracking-widest leading-none mt-0.5 ${selectedSize.sub} ${subtextColor}`}>
            {subtitle}
          </p>
        )}
      </div>
    </div>
  );

  if (to) {
    return (
      <Link 
        to={to} 
        onClick={onClick}
        className="group inline-flex items-center cursor-pointer transition-all duration-200 hover:opacity-95 active:scale-[0.98] select-none focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 rounded-xl"
        title="Go to Home"
      >
        {content}
      </Link>
    );
  }

  if (onClick) {
    return (
      <button 
        type="button"
        onClick={onClick}
        className="group inline-flex items-center cursor-pointer text-left transition-all duration-200 hover:opacity-95 active:scale-[0.98] select-none focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 rounded-xl bg-transparent border-0 p-0"
        title="Go to Home"
      >
        {content}
      </button>
    );
  }

  return content;
};

export default Logo;
