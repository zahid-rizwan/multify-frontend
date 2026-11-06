'use client';

import React from 'react';
import {
  Droplets,
  FlaskConical,
  Microscope,
  Layers,
  ShieldCheck,
  TestTube2,
  Dna,
  Activity,
  Stethoscope,
} from 'lucide-react';

export default function SubjectIcon({ name = '', icon = '', className = 'w-6 h-6' }) {
  const normalized = (icon + ' ' + name).toLowerCase();

  if (normalized.includes('hemat') || normalized.includes('blood') || normalized.includes('droplet')) {
    return <Droplets className={className} />;
  }
  if (normalized.includes('bio') || normalized.includes('chem') || normalized.includes('flask')) {
    return <FlaskConical className={className} />;
  }
  if (normalized.includes('micro') || normalized.includes('myco') || normalized.includes('bacteri')) {
    return <Microscope className={className} />;
  }
  if (normalized.includes('histo') || normalized.includes('cyto') || normalized.includes('layer')) {
    return <Layers className={className} />;
  }
  if (normalized.includes('immuno') || normalized.includes('serol') || normalized.includes('shield')) {
    return <ShieldCheck className={className} />;
  }
  if (normalized.includes('path') || normalized.includes('urin') || normalized.includes('tube')) {
    return <TestTube2 className={className} />;
  }
  if (normalized.includes('dna') || normalized.includes('genet') || normalized.includes('molecul')) {
    return <Dna className={className} />;
  }

  return <Microscope className={className} />;
}

