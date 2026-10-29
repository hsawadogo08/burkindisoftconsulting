import { DOCUMENT } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import {
  LucideMail,
  LucideMapPin,
  LucideMessageCircle,
  LucidePhone,
  LucideSend,
} from '@lucide/angular';
import { Reveal } from '../../../core/animations/reveal.directive';
import { SiteContentService } from '../../../core/site-content.service';
import { BrandLogo } from '../../../shared/ui/brand-logo';
import { SectionHeading } from '../../../shared/ui/section-heading';

/**
 * Limite de longueur du message.
 *
 * Une URL `mailto:` est tronquée au-delà d'environ 2 000 caractères par
 * plusieurs clients de messagerie ; on borne le champ bien en deçà pour que
 * le corps du courriel arrive toujours complet.
 */
const MESSAGE_MAX_LENGTH = 1200;

type SubmitStatus = 'idle' | 'invalid' | 'opened';

@Component({
  selector: 'app-contact-section',
  imports: [
    ReactiveFormsModule,
    SectionHeading,
    BrandLogo,
    Reveal,
    LucideMail,
    LucideMapPin,
    LucideMessageCircle,
    LucidePhone,
    LucideSend,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'block' },
  template: `
    <section id="contact" class="bg-white">
      <div class="mx-auto max-w-7xl px-6 py-16 lg:py-20">
        <app-section-heading
          appReveal
          eyebrow="Contact"
          title="Parlons de votre projet"
          [intro]="content.contactIntro"
        />

        <div class="mt-12 grid gap-8 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-12">
          <!-- Partie 1 : coordonnées -->
          <div class="rounded-2xl bg-brand-50 p-8 lg:p-10" appReveal>
            <app-brand-logo size="lg" />
            <p class="mt-5 text-ink-400">{{ content.footerTagline }}</p>

            <ul class="mt-8 space-y-5">
              <li class="flex items-start gap-4">
                <span [class]="contactIconClass">
                  <svg lucideMapPin class="size-5" [strokeWidth]="2" />
                </span>
                <span>
                  <span class="block text-sm font-bold uppercase tracking-wide text-ink-700">
                    Adresse
                  </span>
                  <span class="mt-0.5 block text-ink-400">{{ content.contactAddress }}</span>
                </span>
              </li>

              <li class="flex items-start gap-4">
                <span [class]="contactIconClass">
                  <svg lucidePhone class="size-5" [strokeWidth]="2" />
                </span>
                <span>
                  <span class="block text-sm font-bold uppercase tracking-wide text-ink-700">
                    Téléphone
                  </span>
                  <a [href]="content.contactPhoneHref" [class]="contactLinkClass">
                    {{ content.contactPhone }}
                  </a>
                </span>
              </li>

              <li class="flex items-start gap-4">
                <span [class]="contactIconClass">
                  <svg lucideMessageCircle class="size-5" [strokeWidth]="2" />
                </span>
                <span>
                  <span class="block text-sm font-bold uppercase tracking-wide text-ink-700">
                    WhatsApp
                  </span>
                  <a
                    [href]="content.whatsappUrl"
                    target="_blank"
                    rel="noopener noreferrer"
                    [class]="contactLinkClass"
                  >
                    {{ content.contactPhone }}
                  </a>
                </span>
              </li>

              <li class="flex items-start gap-4">
                <span [class]="contactIconClass">
                  <svg lucideMail class="size-5" [strokeWidth]="2" />
                </span>
                <span class="min-w-0">
                  <span class="block text-sm font-bold uppercase tracking-wide text-ink-700">
                    E-mail
                  </span>
                  <a
                    [href]="'mailto:' + content.contactEmail"
                    [class]="contactLinkClass + ' break-all'"
                  >
                    {{ content.contactEmail }}
                  </a>
                </span>
              </li>
            </ul>
          </div>

          <!-- Partie 2 : formulaire -->
          <div class="rounded-2xl border border-brand-100 bg-white p-8 shadow-sm lg:p-10" appReveal>
            <form [formGroup]="form" (ngSubmit)="submit()" novalidate>
              <div class="grid gap-5 sm:grid-cols-2">
                <div>
                  <label [class]="labelClass" for="contact-nom">Nom et prénom</label>
                  <input
                    id="contact-nom"
                    type="text"
                    formControlName="fullName"
                    autocomplete="name"
                    [class]="fieldClass"
                    [attr.aria-invalid]="isInvalid('fullName')"
                    [attr.aria-describedby]="isInvalid('fullName') ? 'err-nom' : null"
                  />
                  @if (isInvalid('fullName')) {
                    <p id="err-nom" [class]="errorClass">Merci d'indiquer votre nom et prénom.</p>
                  }
                </div>

                <div>
                  <label [class]="labelClass" for="contact-email">E-mail</label>
                  <input
                    id="contact-email"
                    type="email"
                    formControlName="email"
                    autocomplete="email"
                    [class]="fieldClass"
                    [attr.aria-invalid]="isInvalid('email')"
                    [attr.aria-describedby]="isInvalid('email') ? 'err-email' : null"
                  />
                  @if (isInvalid('email')) {
                    <p id="err-email" [class]="errorClass">
                      Merci d'indiquer une adresse e-mail valide.
                    </p>
                  }
                </div>
              </div>

              <div class="mt-5">
                <label [class]="labelClass" for="contact-sujet">Sujet du message</label>
                <input
                  id="contact-sujet"
                  type="text"
                  formControlName="subject"
                  [class]="fieldClass"
                  [attr.aria-invalid]="isInvalid('subject')"
                  [attr.aria-describedby]="isInvalid('subject') ? 'err-sujet' : null"
                />
                @if (isInvalid('subject')) {
                  <p id="err-sujet" [class]="errorClass">Merci de préciser un sujet.</p>
                }
              </div>

              <div class="mt-5">
                <label [class]="labelClass" for="contact-message">Message</label>
                <textarea
                  id="contact-message"
                  rows="6"
                  formControlName="message"
                  [maxlength]="messageMaxLength"
                  [class]="fieldClass + ' resize-y'"
                  [attr.aria-invalid]="isInvalid('message')"
                  [attr.aria-describedby]="isInvalid('message') ? 'err-message' : null"
                ></textarea>
                @if (isInvalid('message')) {
                  <p id="err-message" [class]="errorClass">
                    Merci d'écrire un message d'au moins 10 caractères.
                  </p>
                }
              </div>

              <!--
                Piège à robots : invisible et hors du parcours clavier. Un
                formulaire rempli automatiquement y laissera une valeur, ce qui
                permet de l'écarter sans infliger de captcha aux visiteurs.
              -->
              <div class="hidden" aria-hidden="true">
                <label for="contact-site">Ne pas remplir</label>
                <input id="contact-site" type="text" formControlName="website" tabindex="-1" />
              </div>

              <button
                type="submit"
                class="mt-8 inline-flex w-full items-center justify-center gap-4 rounded-xl bg-brand-600 px-8 py-4 text-sm font-bold uppercase tracking-wide text-white shadow-lg shadow-brand-600/25 transition hover:bg-brand-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600 motion-safe:active:scale-[0.98] sm:w-auto"
              >
                Envoyer le message
                <svg lucideSend class="size-5" />
              </button>

              <!-- Zone vocalisée : le statut est annoncé par les lecteurs d'écran. -->
              <p role="status" aria-live="polite" class="mt-5">
                @switch (status()) {
                  @case ('opened') {
                    <span class="block rounded-xl bg-success-50 p-4 text-success-600">
                      Votre messagerie s'est ouverte avec le message pré-rempli. Si rien ne se passe,
                      écrivez-nous directement à
                      <a [href]="'mailto:' + content.contactEmail" class="font-bold underline">
                        {{ content.contactEmail }}</a
                      >.
                    </span>
                  }
                  @case ('invalid') {
                    <span class="block rounded-xl bg-accent-50 p-4 text-accent-500">
                      Le formulaire comporte des champs à corriger.
                    </span>
                  }
                }
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>

    <section aria-label="Localisation" class="bg-mist-100">
      <iframe
        [title]="content.mapTitle"
        src="https://www.google.com/maps?q=Ouagadougou,Burkina+Faso&amp;hl=fr&amp;z=12&amp;output=embed"
        loading="lazy"
        referrerpolicy="no-referrer-when-downgrade"
        class="block h-80 w-full border-0 lg:h-96"
      ></iframe>
    </section>
  `,
})
export class ContactSection {
  protected readonly content = inject(SiteContentService);
  private readonly document = inject(DOCUMENT);
  private readonly formBuilder = inject(FormBuilder);

  protected readonly messageMaxLength = MESSAGE_MAX_LENGTH;
  protected readonly status = signal<SubmitStatus>('idle');

  protected readonly form = this.formBuilder.nonNullable.group({
    fullName: ['', [Validators.required, Validators.minLength(2)]],
    email: ['', [Validators.required, Validators.email]],
    subject: ['', [Validators.required, Validators.minLength(3)]],
    message: [
      '',
      [Validators.required, Validators.minLength(10), Validators.maxLength(MESSAGE_MAX_LENGTH)],
    ],
    website: [''],
  });

  protected readonly labelClass = 'mb-2 block text-sm font-bold text-ink-700';

  protected readonly fieldClass =
    'w-full rounded-xl border border-brand-100 bg-mist-100 px-4 py-3 text-ink-700 transition-colors placeholder:text-ink-400 focus:border-brand-600 focus:bg-white focus:outline-2 focus:outline-offset-0 focus:outline-brand-600 aria-[invalid=true]:border-accent-500';

  protected readonly errorClass = 'mt-2 text-sm text-accent-500';

  protected readonly contactIconClass =
    'flex size-10 shrink-0 items-center justify-center rounded-xl bg-white text-brand-600 shadow-sm';

  protected readonly contactLinkClass =
    'mt-0.5 block text-ink-400 transition-colors hover:text-brand-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600';

  /** Une erreur ne s'affiche qu'une fois le champ quitté ou le formulaire soumis. */
  protected isInvalid(controlName: string): boolean {
    const control = this.form.get(controlName);
    return !!control && control.invalid && (control.touched || this.status() === 'invalid');
  }

  protected submit(): void {
    // Champ piège rempli : on ignore silencieusement, sans informer le robot.
    if (this.form.getRawValue().website) {
      return;
    }

    if (this.form.invalid) {
      this.form.markAllAsTouched();
      this.status.set('invalid');
      return;
    }

    this.document.defaultView?.open(this.buildMailtoUrl(), '_self');
    this.status.set('opened');
  }

  private buildMailtoUrl(): string {
    const { fullName, email, subject, message } = this.form.getRawValue();

    // L'expéditeur réel étant la messagerie du visiteur, on rappelle ses
    // coordonnées dans le corps pour que la réponse reste possible.
    //
    // Les sauts de ligne du textarea sont en LF : on normalise l'ensemble en
    // CRLF, seule forme acceptée sans ambiguïté par les clients de messagerie.
    const body = [
      `Nom et prénom : ${fullName}`,
      `E-mail : ${email}`,
      '',
      message.replace(/\r?\n/g, '\r\n'),
    ].join('\r\n');

    const query = `subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    return `mailto:${this.content.contactEmail}?${query}`;
  }
}
