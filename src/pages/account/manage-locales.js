import React, { useState } from 'react';
import { useSelector, useStore } from 'react-redux';
import { useRouter } from 'next/router';
import Authorization from '../../components/authorization';
import SEO from '../../components/seo';
import InfiniteScroll from '../../components/infinite-scroll';
import NavigationBar from '../../components/navigation-bar';
import LocaleActionsBar from '../../components/page-account/locale-actions-bar';
import FormLocaleInfo from '../../components/page-account/form-locale-info';
import Lightbox from '../../components/lightbox';
import { initializeStore } from '../../store/store';
import { getConfiguration, syncConfiguration } from '../../store/actions/config-actions';
import { getLocales, deleteLocale } from '../../store/actions/locale-actions';
import { formatDate } from '../../utils/intl-utils';
import ConfirmationModal from '../../components/modals/confirmation-modal';

export const getServerSideProps = async ({ locale }) => {
  const store = initializeStore();
  await Promise.all([
    store.dispatch(getConfiguration(locale)),
    store.dispatch(getLocales())
  ]);
  
  return {
    props: {
      initialReduxState: store.getState() 
    }
  };
};

const ManageLocales = () => {
  const store = useStore();
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');
  const [pageSize, setPageSize] = useState(20);
  const [localeToEdit, setLocaleToEdit] = useState(null);
  const [localeToDelete, setLocaleToDelete] = useState(null);
  const [isLocaleModalOpen, showLocaleModal] = useState(false);
  const [isDeleteLocaleModalOpen, showDeleteLocaleModal] = useState(false);
  const [isSyncingConfig, setIsSyncingConfig] = useState(false);
  const [isDeletingLocale, setIsDeletingLocale] = useState(false);
  const { translations } = useSelector(state => state.config);
  const locales = useSelector(state => state.locale.records);
  const filteredLocales = locales
    .filter(locale => locale.name.includes(searchTerm))
    .slice(0, pageSize);
  const hasMoreLocales = filteredLocales.length < locales.length;

  const onDeleteLocale = localeToDelete => {
    setIsDeletingLocale(true);
    store.dispatch(deleteLocale(localeToDelete.id))
      .finally(() => setIsDeletingLocale(false));
  };

  const onSyncConfig = () => {
    setIsSyncingConfig(true);
    store.dispatch(syncConfiguration(router.locale))
      .finally(() => setIsSyncingConfig(false));
  };

  return (
    <main>
      <SEO
        title={translations.localesTitle}
        description={translations.localesDescription}>
      </SEO>

      <NavigationBar
        title={translations.localesTitle}
        description={translations.localesDescription}
        showBackBtn={true}
        translations={translations}>
      </NavigationBar>

      <LocaleActionsBar
        isSyncingConfig={isSyncingConfig}
        searchTerm={searchTerm}
        translations={translations}
        onChangeSearchTerm={setSearchTerm}
        onSyncConfig={onSyncConfig}
        onAddNewLocale={() =>{
          setLocaleToEdit({});
          showLocaleModal(true);
        }}>
      </LocaleActionsBar>

      {
        filteredLocales.length === 0 &&
        <h3>{translations.noResults}</h3>
      }
      <InfiniteScroll
        hasMoreData={hasMoreLocales}
        onLoadMore={() => setPageSize(pageSize + 10)}>
        <ul className="locales-list">
          {filteredLocales.map(locale => (
            <li key={locale.id}>
              <div className="info">
                <p>{locale.name}</p>
                <small>{formatDate(locale.createdAt, 'dd/month/yyyy')}</small>
              </div>
              <div className="buttons-wrapper">
                <button 
                  type="button"
                  onClick={() => {
                    setLocaleToEdit(locale);
                    showLocaleModal(true);
                  }}>
                  <i className="fas fa-pen" />
                </button>
                <button 
                  type="button"
                  onClick={() => {
                    setLocaleToDelete(locale);
                    showDeleteLocaleModal(true);
                  }}>
                  <i className="fas fa-trash" />
                </button>
              </div>
            </li>
          ))}
        </ul>
      </InfiniteScroll>
      <Lightbox
        isOpen={isLocaleModalOpen}
        onToggle={() => showLocaleModal(!isLocaleModalOpen)}>
        <FormLocaleInfo
          localeData={localeToEdit}
          translations={translations}
          onCancel={() => showLocaleModal(false)}
          onSave={() => {
            setLocaleToEdit(null);
            showLocaleModal(false);
          }}>
        </FormLocaleInfo>
      </Lightbox>
      <Lightbox 
        isOpen={isDeleteLocaleModalOpen} 
        onToggle={() => showDeleteLocaleModal(!isDeleteLocaleModalOpen)}>
        <ConfirmationModal
          isLoading={isDeletingLocale}
          title={translations['areYouSureToDeleteThis?']}
          translations={translations}
          onCancel={() => {
            showDeleteLocaleModal(false);
            setLocaleToDelete(null);
          }}
          onAccept={() => {
            showDeleteLocaleModal(false);
            onDeleteLocale(localeToDelete);
          }}>
        </ConfirmationModal>
      </Lightbox>
      <style jsx>{`
        main {
          max-width: var(--container-width);
          margin: 0 auto;
          padding: calc(var(--spacer) * 2);

          ul.locales-list {
            list-style: none;
            margin-top: calc(var(--spacer) * 3);

            li {
              display: flex;
              align-items: center;
              padding: 10px;
              border-bottom: 1px solid #ccc;

              &:last-child {
                border-bottom: none;
              }

              .info {
                flex-grow: 1;
              }

              .buttons-wrapper {
                margin-left: auto;

                button {
                  background: none;
                  border: none;
                  cursor: pointer;
                  padding: var(--spacer);
                  margin-left: 5px;
                }
              }
            }
          }
        }  
      `}</style>
    </main>
  );

};

export default Authorization(ManageLocales, ['admin']);